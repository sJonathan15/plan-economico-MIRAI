/*
  Warnings:

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

*/
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
ALTER TABLE "plans" ADD COLUMN     "socialImpact" TEXT;
