import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import prisma from '../config/database';
import { emailService } from '../services/emailService';

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const password_hash = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password_hash,
                role: role || 'STUDENT',
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            user,
            token,
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ error: 'El correo electrónico no se encuentra registrado.' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password_hash);

        if (!isValidPassword) {
            return res.status(401).json({ error: 'La contraseña ingresada es incorrecta.' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const verifyPassword = async (req: any, res: Response) => {
    try {
        const { password } = req.body;
        const userId = req.userId;

        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isValid = await bcrypt.compare(password, user.password_hash);

        if (!isValid) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        res.json({ message: 'Password verified' });
    } catch (error) {
        console.error('Verify password error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        // Use a generic success message to prevent user enumeration
        const successMessage = { message: 'Si el correo existe, se enviaron las instrucciones para recuperar tu contraseña.' };

        if (!user) {
            // Optional: simulate a slight delay to match successful operation timing
            return res.json(successMessage);
        }

        // Generate secure random token
        const rawToken = crypto.randomBytes(32).toString('hex');

        // Hash token for storage
        const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

        // Expiry in 30 minutes
        const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

        // Delete any existing tokens for this user and create new one
        await prisma.$transaction([
            prisma.passwordResetToken.deleteMany({ where: { userId: user.id } }),
            prisma.passwordResetToken.create({
                data: {
                    token: hashedToken,
                    userId: user.id,
                    expiresAt
                }
            })
        ]);

        // Send email with the RAW token
        try {
            await emailService.sendRecoveryEmail(user.email, user.name, rawToken);
        } catch (emailError) {
            console.error('[authController] Failed to send recovery email:', emailError);
            return res.status(500).json({
                error: 'No fue posible enviar el correo de recuperación. Por favor intenta nuevamente más tarde.'
            });
        }

        res.json(successMessage);
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({ error: 'Token and new password are required' });
        }

        // Hash provided token to compare with DB
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token: hashedToken },
            include: { user: true }
        });

        if (!resetToken || resetToken.expiresAt < new Date()) {
            return res.status(400).json({ error: 'Token inválido o expirado' });
        }

        // Update password and delete token
        const password_hash = await bcrypt.hash(password, 10);

        await prisma.$transaction([
            prisma.user.update({
                where: { id: resetToken.userId },
                data: { password_hash }
            }),
            prisma.passwordResetToken.delete({
                where: { id: resetToken.id }
            })
        ]);

        res.json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
