import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';
import { generateDocument } from '../services/documentService';
import fs from 'fs';
import path from 'path';
import { calculateProjections, calculateIndicators, generateAutomaticConclusion } from '../services/financialService';

export const createPlan = async (req: AuthRequest, res: Response) => {
    try {
        const {
            entrepreneurshipId,
            businessDescription,
            mainActivity,
            productiveFocus,
            socialImpact,
            valueProposition,
            differentiation,
            customerBenefits,
            communicationChannels,
            commercializationChannels,
            supplyChainMode,
            team, // array
            partners, // array
            segments, // array
            supplyChain, // object {providers, production, storage, distribution, client}
            annexes,  // array of URLs
            rates,    // object {growthRate, priceGrowthRate, discountRate, inflationRate, salaryIncreaseRate}
            demands, // array
            equipments, // array
            unitCosts, // array
            totalMonthlyUnitCost,
            totalAnnualUnitCost,
            provisions, // array
            financing, // array
            totalCost,
            netProfit,
            van,
            tir,
            benefitCostRatio,
            paybackPeriod,
            financialConclusion,
        } = req.body;

        // 1. Verify ownership
        const ent = await prisma.entrepreneurship.findFirst({
            where: { id: entrepreneurshipId, userId: req.userId },
        });

        if (!ent) return res.status(404).json({ error: 'Entrepreneurship not found' });

        const safeNum = (val: any, fallback: number | null = null): number | null => {
            const n = parseFloat(val);
            return isNaN(n) ? fallback : n;
        };

        // 3. Transactional Creation
        const plan = await prisma.$transaction(async (tx: any) => {
            // RELATIONAL DATA: Update Entrepreneurship's relational tables
            await tx.teamMember.deleteMany({ where: { entrepreneurshipId } });
            if (team && Array.isArray(team) && team.length > 0) {
                const validTeam = team.filter(t => t.name?.trim());
                if (validTeam.length > 0) {
                    await tx.teamMember.createMany({ data: validTeam.map((t: any) => ({ entrepreneurshipId, name: t.name, role: t.role, experience: t.experience })) });
                }
            }

            await tx.keyPartner.deleteMany({ where: { entrepreneurshipId } });
            if (partners && Array.isArray(partners) && partners.length > 0) {
                const validPartners = partners.filter(p => p.name?.trim());
                if (validPartners.length > 0) {
                    await tx.keyPartner.createMany({ data: validPartners.map((p: any) => ({ entrepreneurshipId, name: p.name, type: p.type, role: p.role })) });
                }
            }

            await tx.customerSegment.deleteMany({ where: { entrepreneurshipId } });
            if (segments && Array.isArray(segments) && segments.length > 0) {
                const validSegments = segments.filter(s => s.name?.trim());
                if (validSegments.length > 0) {
                    await tx.customerSegment.createMany({ data: validSegments.map((s: any) => ({ entrepreneurshipId, name: s.name, percentage: parseInt(s.percentage) || 0, ageRange: s.ageRange, socioeconomicLevel: s.socioeconomicLevel, characteristics: s.characteristics })) });
                }
            }

            // RELATIONAL DATA PREPARATION
            const validDemands = Array.isArray(demands) ? demands.filter(d => d.productName?.trim()) : [];
            const validEquipments = Array.isArray(equipments) ? equipments.filter(e => e.description?.trim()) : [];
            const validUnitCosts = Array.isArray(unitCosts) ? unitCosts.filter(u => u.productName?.trim()) : [];

            // Provisions are nested: Array<{ productId, inputs: Array<{ item, unit, monthlyQuantity, unitPrice }> }>
            const flatProvisions: any[] = [];
            if (Array.isArray(provisions)) {
                provisions.forEach((prod: any) => {
                    if (prod.inputs && Array.isArray(prod.inputs)) {
                        prod.inputs.forEach((input: any) => {
                            if (input.item?.trim()) {
                                flatProvisions.push({
                                    ...input,
                                    productId: prod.productId // Capture productId (wizard ID)
                                });
                            }
                        });
                    }
                });
            }
            const validProvisions = flatProvisions;

            const validFinancing = Array.isArray(financing) ? financing.filter(f => f.concept?.trim()) : [];
            const validImages = (Array.isArray(annexes) ? annexes : []).filter(url => url && typeof url === 'string');

            // Create the Plan with all autonomous sections
            return await tx.plan.create({
                data: {
                    entrepreneurship: { connect: { id: entrepreneurshipId } },
                    // Section 1: Business Description
                    businessDescription: req.body.businessDescription,
                    mainActivity: req.body.mainActivity,
                    productiveFocus: req.body.productiveFocus,
                    socialImpact: req.body.socialImpact,

                    // Section 2: Value Proposition
                    valueProposition: req.body.valueProposition,
                    differentiation: req.body.differentiation,
                    customerBenefits: req.body.customerBenefits,

                    // Section 4 & 5: Channels
                    communicationChannels: req.body.communicationChannels,
                    commercializationChannels: req.body.commercializationChannels,

                    // Section 8: Supply Chain
                    supplyChainMode: req.body.supplyChainMode,
                    supplyChainProviders: req.body.supplyChain?.providers,
                    supplyChainProduction: req.body.supplyChain?.production,
                    supplyChainStorage: req.body.supplyChain?.storage,
                    supplyChainDistribution: req.body.supplyChain?.distribution,
                    supplyChainClient: req.body.supplyChain?.client,
                    supplyChainImageUrl: req.body.supplyChainMode === 'IMAGE' ? req.body.supplyChain?.imageUrl : null,

                    // Section 9: Rates
                    growthRate: safeNum(rates?.growthRate, 0)!,
                    priceGrowthRate: safeNum(rates?.priceGrowthRate, 0)!,
                    discountRate: safeNum(rates?.discountRate, 0)!,
                    inflationRate: safeNum(rates?.inflationRate, 0)!,
                    salaryIncreaseRate: safeNum(rates?.salaryIncreaseRate, 0)!,

                    // Indicators (Persisted from req.body)
                    van: safeNum(van, null),
                    tir: safeNum(tir, null),
                    benefitCostRatio: safeNum(benefitCostRatio, null),
                    paybackPeriod: paybackPeriod || null,
                    financialConclusion: financialConclusion || null,
                    totalCost: safeNum(totalCost, 0)!,
                    netProfit: safeNum(netProfit, 0)!,
                    totalMonthlyUnitCost: safeNum(totalMonthlyUnitCost, 0)!,
                    totalAnnualUnitCost: safeNum(totalAnnualUnitCost, 0)!,

                    // Section 10-14: Financial Tables (Conditional Relations)
                    ...(validDemands.length > 0 && { demands: { create: validDemands.map((d: any) => ({ productName: d.productName, monthlyDemand: parseInt(d.monthlyDemand) || 0, unitPrice: safeNum(d.unitPrice, 0)! })) } }),
                    ...(validEquipments.length > 0 && { equipments: { create: validEquipments.map((e: any) => ({ description: e.description, quantity: parseInt(e.quantity) || 0, unitPrice: safeNum(e.unitPrice, 0)!, accountType: e.accountType, financingSource: e.financingSource })) } }),
                    ...(validUnitCosts.length > 0 && { unitCosts: { create: validUnitCosts.map((u: any) => ({ wizardId: BigInt(u.id), productName: u.productName, monthlyQuantity: parseInt(u.monthlyQuantity) || 0, unitCost: safeNum(u.unitCost, 0)!, total: safeNum(u.total, 0)! })) } }),
                    ...(validProvisions.length > 0 && { provisions: { create: validProvisions.map((p: any) => ({ productId: BigInt(p.productId), item: p.item, unit: p.unit, monthlyQuantity: safeNum(p.monthlyQuantity, 0)!, unitPrice: safeNum(p.unitPrice, 0)! })) } }),
                    ...(validFinancing.length > 0 && { financingItems: { create: validFinancing.map((f: any) => ({ concept: f.concept, amount: safeNum(f.amount, 0)!, source: f.source })) } }),

                    // Section 15: Annexes
                    ...(validImages.length > 0 && { images: { create: validImages.map((url: string) => ({ url })) } }),
                }
            });
        });

        res.status(201).json({ message: 'Plan advanced created successfully', plan });
    } catch (error) {
        console.error('Create plan error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getPlans = async (req: AuthRequest, res: Response) => {
    try {
        const plans = await prisma.plan.findMany({
            where: {
                entrepreneurship: {
                    userId: req.userId,
                },
            },
            include: {
                entrepreneurship: {
                    select: {
                        name: true,
                        sector: true,
                        logoUrl: true,
                        representativeName: true,
                        email: true,
                    },
                },
                documents: {
                    select: {
                        id: true,
                        filePath: true,
                        createdAt: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        res.json(plans);
    } catch (error) {
        console.error('Get plans error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getPlan = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        const plan = await prisma.plan.findFirst({
            where: {
                id: parseInt(id),
                entrepreneurship: {
                    userId: req.userId,
                },
            },
            include: {
                entrepreneurship: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true,
                            },
                        },
                        team: true,
                        segments: true,
                        partners: true,
                    },
                },
                demands: true,
                equipments: true,
                unitCosts: true,
                provisions: true,
                financingItems: true,
                projections: true,
                documents: true,
                images: true,
            },
        });

        if (!plan) {
            return res.status(404).json({ error: 'Plan not found' });
        }

        // Calculate total general provisions dynamically if not in schema
        const totalGeneralProvisions = (plan.provisions || []).reduce((acc: number, p: any) => {
            return acc + (parseFloat(p.monthlyQuantity.toString()) * parseFloat(p.unitPrice.toString()));
        }, 0);

        // Convert BigInt to string manually to avoid JSON serialization errors
        const serializedPlan = JSON.parse(JSON.stringify(plan, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));

        res.json({
            ...serializedPlan,
            totalGeneralProvisions
        });
    } catch (error) {
        console.error('Get plan error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updatePlan = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const {
            investment,
            fixedCosts,
            variableCosts,
            income,
            profitability,
            totalCost,
            netProfit,
        } = req.body;

        // Verify ownership
        const existingPlan = await prisma.plan.findFirst({
            where: {
                id: parseInt(id),
                entrepreneurship: {
                    userId: req.userId,
                },
            },
        });

        if (!existingPlan) {
            return res.status(404).json({ error: 'Plan not found' });
        }

        const plan = await prisma.plan.update({
            where: { id: parseInt(id) },
            data: {
                ...(investment && { investment }),
                ...(fixedCosts && { fixedCosts }),
                ...(variableCosts && { variableCosts }),
                ...(income && { income }),
                ...(profitability && { profitability }),
                ...(totalCost !== undefined && { totalCost }),
                ...(netProfit !== undefined && { netProfit }),
            },
        });

        res.json({
            message: 'Plan updated successfully',
            plan,
        });
    } catch (error) {
        console.error('Update plan error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const exportPlan = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        const plan = await prisma.plan.findFirst({
            where: {
                id: parseInt(id),
                entrepreneurship: {
                    userId: req.userId,
                },
            },
            include: {
                entrepreneurship: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true,
                            },
                        },
                        team: true,
                        segments: true,
                        partners: true,
                    },
                },
                demands: true,
                equipments: true,
                unitCosts: true,
                provisions: true,
                financingItems: true,
                projections: true,
                documents: true,
                images: true,
            },
        });

        if (!plan) {
            return res.status(404).json({ error: 'Plan not found' });
        }

        // Generate Word document
        const buffer = await generateDocument(plan as any);

        // Ensure uploads directory exists and Save file for history
        const fileName = `plan_${plan.id}_${Date.now()}.docx`;
        const uploadsDir = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const filePath = path.join(uploadsDir, fileName);
        fs.writeFileSync(filePath, buffer);

        // Save document record in DB
        await prisma.document.create({
            data: {
                planId: plan.id,
                filePath: `/uploads/${fileName}`,
            },
        });

        // Send file for download with EXACT requested headers
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="plan_economico.docx"'
        );
        res.status(200);
        res.end(buffer);
    } catch (error) {
        console.error('Export plan error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deletePlan = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        const plan = await prisma.plan.findFirst({
            where: {
                id: parseInt(id),
                entrepreneurship: {
                    userId: req.userId,
                },
            },
        });

        if (!plan) {
            return res.status(404).json({ error: 'Plan not found' });
        }

        await prisma.plan.delete({
            where: { id: parseInt(id) },
        });

        res.json({ message: 'Plan deleted successfully' });
    } catch (error) {
        console.error('Delete plan error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteDocument = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        // Verify ownership through the related plan and entrepreneurship
        const document = await prisma.document.findFirst({
            where: {
                id: parseInt(id),
                plan: {
                    entrepreneurship: {
                        userId: req.userId,
                    }
                }
            },
            include: {
                plan: true
            }
        });

        if (!document) {
            return res.status(404).json({ error: 'Document not found or unauthorized' });
        }

        // Delete physical file if exists
        const fullPath = path.join(__dirname, '../..', document.filePath);
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
        }

        // Delete from DB
        await prisma.document.delete({
            where: { id: parseInt(id) },
        });

        res.json({ message: 'Document deleted successfully' });
    } catch (error) {
        console.error('Delete document error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
