import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export const createEntrepreneurship = async (req: AuthRequest, res: Response) => {
    try {
        const {
            name,
            brand,
            // Representative
            representativeName,
            representativeId,
            representativeGender,
            representativeNationality,
            representativeBirthDate,
            representativeAge,
            // Address
            addressProvince,
            addressCanton,
            addressParish,
            addressComplete,
            // Contact
            email,
            phone,
            mobile,
            hasRuc,
            rucNumber,
            activitiesStartDate,
            sector,
            logoUrl,
            // Nested
            team,
            segments
        } = req.body;

        if (!name || !sector) {
            return res.status(400).json({ error: 'Name and sector are required' });
        }

        const entrepreneurship = await prisma.entrepreneurship.create({
            data: {
                userId: req.userId!,
                name,
                brand,
                representativeName,
                representativeId,
                representativeGender,
                representativeNationality,
                representativeBirthDate: representativeBirthDate ? new Date(representativeBirthDate) : null,
                representativeAge: representativeAge ? parseInt(representativeAge) : null,
                addressProvince,
                addressCanton,
                addressParish,
                addressComplete,
                email,
                phone,
                mobile,
                hasRuc: hasRuc === true || hasRuc === 'true',
                rucNumber: (hasRuc === true || hasRuc === 'true' ? rucNumber : null) as any,
                activitiesStartDate: activitiesStartDate ? new Date(activitiesStartDate) : null,
                sector,
                logoUrl,
                team: {
                    create: team?.map((t: any) => ({
                        name: t.name,
                        experience: t.experience,
                        role: t.role
                    })) || []
                },
                segments: {
                    create: segments?.map((s: any) => ({
                        name: s.name,
                        percentage: s.percentage ? parseInt(s.percentage) : null,
                        ageRange: s.ageRange,
                        socioeconomicLevel: s.socioeconomicLevel,
                        characteristics: s.characteristics
                    })) || []
                }
            } as any,
            include: {
                team: true,
                segments: true
            }
        });

        res.status(201).json({
            message: 'Entrepreneurship created successfully',
            entrepreneurship,
        });
    } catch (error) {
        console.error('Create entrepreneurship error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getEntrepreneurships = async (req: AuthRequest, res: Response) => {
    try {
        const entrepreneurships = await prisma.entrepreneurship.findMany({
            where: { userId: req.userId },
            include: {
                plans: {
                    select: {
                        id: true,
                        totalCost: true,
                        netProfit: true,
                        createdAt: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        res.json(entrepreneurships);
    } catch (error) {
        console.error('Get entrepreneurships error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getEntrepreneurship = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        const entrepreneurship = await prisma.entrepreneurship.findFirst({
            where: {
                id: parseInt(id),
                userId: req.userId,
            },
            include: {
                plans: {
                    orderBy: { createdAt: 'desc' },
                },
                team: true,
                segments: true
            },
        });

        if (!entrepreneurship) {
            return res.status(404).json({ error: 'Entrepreneurship not found' });
        }

        res.json(entrepreneurship);
    } catch (error) {
        console.error('Get entrepreneurship error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateEntrepreneurship = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const entrepreneurshipId = parseInt(id);

        // Verify ownership
        const existing = await prisma.entrepreneurship.findFirst({
            where: { id: entrepreneurshipId, userId: req.userId }
        });

        if (!existing) {
            return res.status(404).json({ error: 'Entrepreneurship not found' });
        }

        // Prepare update data
        const updateData: any = { ...data };

        // Remove nested items and relations from direct update
        delete updateData.team;
        delete updateData.segments;
        delete updateData.plans;
        delete updateData.partners;
        delete updateData.user;
        delete updateData.id;
        delete updateData.userId;
        delete updateData.createdAt;
        delete updateData.updatedAt;

        // Date conversions
        if (updateData.representativeBirthDate) updateData.representativeBirthDate = new Date(updateData.representativeBirthDate);
        if (updateData.activitiesStartDate) updateData.activitiesStartDate = new Date(updateData.activitiesStartDate);
        if (updateData.representativeAge) updateData.representativeAge = parseInt(updateData.representativeAge);
        if (updateData.hasRuc !== undefined) {
            updateData.hasRuc = updateData.hasRuc === true || updateData.hasRuc === 'true';
            if (!updateData.hasRuc) updateData.rucNumber = null;
        }

        // Transaction for atomic update
        const updatedEntrepreneurship = await prisma.$transaction(async (prisma) => {
            // Update main fields
            const ent = await prisma.entrepreneurship.update({
                where: { id: entrepreneurshipId },
                data: updateData
            });

            // Handle Team: Delete all and recreate (simplest for full form sync)
            if (data.team) {
                await prisma.teamMember.deleteMany({ where: { entrepreneurshipId } });
                if (data.team.length > 0) {
                    await prisma.teamMember.createMany({
                        data: data.team.map((t: any) => ({
                            entrepreneurshipId,
                            name: t.name,
                            experience: t.experience,
                            role: t.role
                        }))
                    });
                }
            }

            // Handle Segments: Delete all and recreate
            if (data.segments) {
                await prisma.customerSegment.deleteMany({ where: { entrepreneurshipId } });
                if (data.segments.length > 0) {
                    await prisma.customerSegment.createMany({
                        data: data.segments.map((s: any) => ({
                            entrepreneurshipId,
                            name: s.name,
                            percentage: s.percentage ? parseInt(s.percentage) : null,
                            ageRange: s.ageRange,
                            socioeconomicLevel: s.socioeconomicLevel,
                            characteristics: s.characteristics
                        }))
                    });
                }
            }

            return ent;
        });

        res.json({ message: 'Entrepreneurship updated successfully', entrepreneurship: updatedEntrepreneurship });
    } catch (error) {
        console.error('Update entrepreneurship error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteEntrepreneurship = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        const entrepreneurship = await prisma.entrepreneurship.deleteMany({
            where: {
                id: parseInt(id),
                userId: req.userId,
            },
        });

        if (entrepreneurship.count === 0) {
            return res.status(404).json({ error: 'Entrepreneurship not found' });
        }

        res.json({ message: 'Entrepreneurship deleted successfully' });
    } catch (error) {
        console.error('Delete entrepreneurship error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Generic image update helper
const updateImageField = async (req: AuthRequest, res: Response, fieldName: 'imageUrl' | 'logoUrl' | 'supplyChainImageUrl') => {
    try {
        const { id } = req.params;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filePath = `/uploads/${file.filename}`;
        const data: any = {};
        data[fieldName] = filePath;

        const entrepreneurship = await prisma.entrepreneurship.updateMany({
            where: {
                id: parseInt(id),
                userId: req.userId,
            },
            data,
        });

        if (entrepreneurship.count === 0) {
            return res.status(404).json({ error: 'Entrepreneurship not found' });
        }

        res.json({
            message: `${fieldName} updated successfully`,
            [fieldName]: filePath,
        });
    } catch (error) {
        console.error(`Update ${fieldName} error:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateImage = (req: AuthRequest, res: Response) => updateImageField(req, res, 'imageUrl');
export const updateLogo = (req: AuthRequest, res: Response) => updateImageField(req, res, 'logoUrl');
export const updateSupplyChainImage = (req: AuthRequest, res: Response) => updateImageField(req, res, 'supplyChainImageUrl');

export const uploadImageGeneric = async (req: AuthRequest, res: Response) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filePath = `/uploads/${file.filename}`;
        res.json({
            message: 'Image uploaded successfully',
            url: filePath,
        });
    } catch (error) {
        console.error('Generic upload error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

