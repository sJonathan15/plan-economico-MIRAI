/*
  Warnings:

  - You are about to drop the column `entrepreneurshipId` on the `customer_segments` table. All the data in the column will be lost.
  - You are about to drop the column `commercializationChannels` on the `entrepreneurships` table. All the data in the column will be lost.
  - You are about to drop the column `communicationChannels` on the `entrepreneurships` table. All the data in the column will be lost.
  - You are about to drop the column `customerBenefits` on the `entrepreneurships` table. All the data in the column will be lost.
  - You are about to drop the column `differentiation` on the `entrepreneurships` table. All the data in the column will be lost.
  - You are about to drop the column `mainActivity` on the `entrepreneurships` table. All the data in the column will be lost.
  - You are about to drop the column `productiveFocus` on the `entrepreneurships` table. All the data in the column will be lost.
  - You are about to drop the column `socialImpact` on the `entrepreneurships` table. All the data in the column will be lost.
  - You are about to drop the column `supplyChainClient` on the `entrepreneurships` table. All the data in the column will be lost.
  - You are about to drop the column `supplyChainDistribution` on the `entrepreneurships` table. All the data in the column will be lost.
  - You are about to drop the column `supplyChainImageUrl` on the `entrepreneurships` table. All the data in the column will be lost.
  - You are about to drop the column `supplyChainMode` on the `entrepreneurships` table. All the data in the column will be lost.
  - You are about to drop the column `supplyChainProduction` on the `entrepreneurships` table. All the data in the column will be lost.
  - You are about to drop the column `supplyChainProviders` on the `entrepreneurships` table. All the data in the column will be lost.
  - You are about to drop the column `supplyChainStorage` on the `entrepreneurships` table. All the data in the column will be lost.
  - You are about to drop the column `valueProposition` on the `entrepreneurships` table. All the data in the column will be lost.
  - You are about to drop the column `entrepreneurshipId` on the `key_partners` table. All the data in the column will be lost.
  - You are about to drop the column `entrepreneurshipId` on the `team_members` table. All the data in the column will be lost.
  - Added the required column `planId` to the `customer_segments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planId` to the `key_partners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planId` to the `team_members` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "customer_segments" DROP CONSTRAINT "customer_segments_entrepreneurshipId_fkey";

-- DropForeignKey
ALTER TABLE "key_partners" DROP CONSTRAINT "key_partners_entrepreneurshipId_fkey";

-- DropForeignKey
ALTER TABLE "team_members" DROP CONSTRAINT "team_members_entrepreneurshipId_fkey";

-- AlterTable
ALTER TABLE "customer_segments" DROP COLUMN "entrepreneurshipId",
ADD COLUMN     "planId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "entrepreneurships" DROP COLUMN "commercializationChannels",
DROP COLUMN "communicationChannels",
DROP COLUMN "customerBenefits",
DROP COLUMN "differentiation",
DROP COLUMN "mainActivity",
DROP COLUMN "productiveFocus",
DROP COLUMN "socialImpact",
DROP COLUMN "supplyChainClient",
DROP COLUMN "supplyChainDistribution",
DROP COLUMN "supplyChainImageUrl",
DROP COLUMN "supplyChainMode",
DROP COLUMN "supplyChainProduction",
DROP COLUMN "supplyChainProviders",
DROP COLUMN "supplyChainStorage",
DROP COLUMN "valueProposition";

-- AlterTable
ALTER TABLE "key_partners" DROP COLUMN "entrepreneurshipId",
ADD COLUMN     "planId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "plans" ADD COLUMN     "businessDescription" TEXT,
ADD COLUMN     "commercializationChannels" TEXT,
ADD COLUMN     "communicationChannels" TEXT,
ADD COLUMN     "customerBenefits" TEXT,
ADD COLUMN     "differentiation" TEXT,
ADD COLUMN     "mainActivity" TEXT,
ADD COLUMN     "productiveFocus" TEXT,
ADD COLUMN     "supplyChainClient" TEXT,
ADD COLUMN     "supplyChainDistribution" TEXT,
ADD COLUMN     "supplyChainImageUrl" TEXT,
ADD COLUMN     "supplyChainMode" TEXT DEFAULT 'GUIDED',
ADD COLUMN     "supplyChainProduction" TEXT,
ADD COLUMN     "supplyChainProviders" TEXT,
ADD COLUMN     "supplyChainStorage" TEXT,
ADD COLUMN     "valueProposition" TEXT;

-- AlterTable
ALTER TABLE "team_members" DROP COLUMN "entrepreneurshipId",
ADD COLUMN     "planId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "key_partners" ADD CONSTRAINT "key_partners_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_segments" ADD CONSTRAINT "customer_segments_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
