import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Attempting to connect to the database...');
        const userCount = await prisma.user.count();
        console.log(`Connection successful! User count: ${userCount}`);

        const testUser = await prisma.user.findUnique({
            where: { email: 'jcanar89@gmail.com' }
        });

        if (testUser) {
            console.log('Test user found:', testUser.email);
        } else {
            console.log('Test user NOT found.');
        }
    } catch (error) {
        console.error('Connection failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
