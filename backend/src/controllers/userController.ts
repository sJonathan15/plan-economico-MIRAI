import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export const getProfile = async (req: AuthRequest, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                profileImage: true,
                coverImage: true,
                createdAt: true,
                entrepreneurships: {
                    select: {
                        id: true,
                        name: true,
                        sector: true,
                        imageUrl: true,
                        logoUrl: true,
                        representativeName: true,
                        email: true,
                    },
                },
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
    try {
        const { name, email } = req.body;

        const user = await prisma.user.update({
            where: { id: req.userId },
            data: {
                ...(name && { name }),
                ...(email && { email }),
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                profileImage: true,
                coverImage: true,
                createdAt: true,
            },
        });

        res.json({
            message: 'Profile updated successfully',
            user,
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateImages = async (req: AuthRequest, res: Response) => {
    try {
        const { type } = req.body;
        const file = req.file;

        console.log('--- Upload Trace ---');
        console.log('User ID:', req.userId);
        console.log('Body:', req.body);
        console.log('File:', file ? file.filename : 'MISSING');
        console.log('Type:', type);

        if (!file) {
            return res.status(400).json({ error: 'No se recibió ninguna imagen' });
        }

        if (!type || (type !== 'profile' && type !== 'cover')) {
            console.warn('Unknown image type received:', type);
        }

        const filePath = `/uploads/${file.filename}`;

        const updateData: any = {};
        if (type === 'profile') {
            updateData.profileImage = filePath;
        } else {
            // Default to cover if not specified or specified as cover
            updateData.coverImage = filePath;
        }

        const user = await prisma.user.update({
            where: { id: req.userId },
            data: updateData,
            select: {
                id: true,
                name: true,
                email: true,
                profileImage: true,
                coverImage: true,
            },
        });

        console.log('User updated successfully:', user.id);

        res.json({
            message: 'Imagen actualizada correctamente',
            user,
        });
    } catch (error) {
        console.error('Update images error:', error);
        res.status(500).json({ error: 'Error interno del servidor al subir imagen' });
    }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'La contraseña actual y la nueva son requeridas' });
        }

        const user = await prisma.user.findUnique({
            where: { id: req.userId },
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const isMatch = await require('bcrypt').compare(currentPassword, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ error: 'La contraseña actual es incorrecta' });
        }

        const password_hash = await require('bcrypt').hash(newPassword, 10);

        await prisma.user.update({
            where: { id: req.userId },
            data: { password_hash },
        });

        res.json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
