import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const id = 7; // The ID that failed in the browser
    console.log(`Testing update for entrepreneurship ID: ${id}`);

    const ent = await prisma.entrepreneurship.findUnique({
        where: { id },
        include: { team: true, segments: true }
    });

    if (!ent) {
        console.error('Entrepreneurship not found');
        return;
    }

    console.log('Original data:', JSON.stringify(ent, null, 2));

    // Simulate what the controller does
    const data = { ...ent, name: 'Test Debug Edited' };
    const updateData: any = { ...data };

    delete updateData.team;
    delete updateData.segments;
    delete updateData.id;
    delete updateData.userId;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    if (updateData.representativeBirthDate) updateData.representativeBirthDate = new Date(updateData.representativeBirthDate);
    if (updateData.activitiesStartDate) updateData.activitiesStartDate = new Date(updateData.activitiesStartDate);
    if (updateData.representativeAge) updateData.representativeAge = parseInt(updateData.representativeAge);
    if (updateData.hasRuc !== undefined) updateData.hasRuc = updateData.hasRuc === true || updateData.hasRuc === 'true';

    try {
        const result = await prisma.$transaction(async (tx) => {
            const updated = await tx.entrepreneurship.update({
                where: { id },
                data: updateData
            });

            // Handle Team
            if (data.team) {
                await tx.teamMember.deleteMany({ where: { entrepreneurshipId: id } });
                if (data.team.length > 0) {
                    await tx.teamMember.createMany({
                        data: data.team.map((t: any) => ({
                            entrepreneurshipId: id,
                            name: t.name,
                            experience: t.experience,
                            role: t.role
                        }))
                    });
                }
            }

            // Handle Segments
            if (data.segments) {
                await tx.customerSegment.deleteMany({ where: { entrepreneurshipId: id } });
                if (data.segments.length > 0) {
                    await tx.customerSegment.createMany({
                        data: data.segments.map((s: any) => ({
                            entrepreneurshipId: id,
                            name: s.name,
                            percentage: s.percentage ? parseInt(s.percentage) : null,
                            ageRange: s.ageRange,
                            socioeconomicLevel: s.socioeconomicLevel,
                            characteristics: s.characteristics
                        }))
                    });
                }
            }
            return updated;
        });
        console.log('Update successful:', result);
    } catch (err) {
        console.error('UPDATE FAILED IN SCRIPT:', err);
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
