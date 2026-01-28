import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const count = await prisma.entrepreneurship.count();
    console.log(`Total entrepreneurships: ${count}`);
    const last = await prisma.entrepreneurship.findFirst({
        orderBy: { createdAt: 'desc' }
    });
    console.log('Last entrepreneurship:', last);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
