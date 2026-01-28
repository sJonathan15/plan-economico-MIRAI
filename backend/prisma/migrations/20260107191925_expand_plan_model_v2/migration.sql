/*
  Warnings:

  - You are about to drop the column `planId` on the `customer_segments` table. All the data in the column will be lost.
  - You are about to drop the column `planId` on the `key_partners` table. All the data in the column will be lost.
  - You are about to drop the column `caption` on the `plan_images` table. All the data in the column will be lost.
  - You are about to drop the column `planId` on the `team_members` table. All the data in the column will be lost.
  - Added the required column `entrepreneurshipId` to the `customer_segments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entrepreneurshipId` to the `key_partners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entrepreneurshipId` to the `team_members` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "customer_segments" DROP CONSTRAINT "customer_segments_planId_fkey";

-- DropForeignKey
ALTER TABLE "key_partners" DROP CONSTRAINT "key_partners_planId_fkey";

-- DropForeignKey
ALTER TABLE "team_members" DROP CONSTRAINT "team_members_planId_fkey";

-- AlterTable
ALTER TABLE "customer_segments" DROP COLUMN "planId",
ADD COLUMN     "entrepreneurshipId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "entrepreneurships" ADD COLUMN     "commercializationChannels" TEXT,
ADD COLUMN     "communicationChannels" TEXT,
ADD COLUMN     "customerBenefits" TEXT,
ADD COLUMN     "differentiation" TEXT,
ADD COLUMN     "mainActivity" TEXT,
ADD COLUMN     "productiveFocus" TEXT,
ADD COLUMN     "socialImpact" TEXT,
ADD COLUMN     "supplyChainClient" TEXT,
ADD COLUMN     "supplyChainDistribution" TEXT,
ADD COLUMN     "supplyChainImageUrl" TEXT,
ADD COLUMN     "supplyChainMode" TEXT DEFAULT 'GUIDED',
ADD COLUMN     "supplyChainProduction" TEXT,
ADD COLUMN     "supplyChainProviders" TEXT,
ADD COLUMN     "supplyChainStorage" TEXT,
ADD COLUMN     "valueProposition" TEXT;

-- AlterTable
ALTER TABLE "key_partners" DROP COLUMN "planId",
ADD COLUMN     "entrepreneurshipId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "plan_images" DROP COLUMN "caption";

-- AlterTable
ALTER TABLE "team_members" DROP COLUMN "planId",
ADD COLUMN     "entrepreneurshipId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "key_partners" ADD CONSTRAINT "key_partners_entrepreneurshipId_fkey" FOREIGN KEY ("entrepreneurshipId") REFERENCES "entrepreneurships"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_entrepreneurshipId_fkey" FOREIGN KEY ("entrepreneurshipId") REFERENCES "entrepreneurships"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_segments" ADD CONSTRAINT "customer_segments_entrepreneurshipId_fkey" FOREIGN KEY ("entrepreneurshipId") REFERENCES "entrepreneurships"("id") ON DELETE CASCADE ON UPDATE CASCADE;
