/*
  Warnings:

  - You are about to drop the column `commercialChannels` on the `entrepreneurships` table. All the data in the column will be lost.
  - You are about to drop the column `keyPartners` on the `entrepreneurships` table. All the data in the column will be lost.
  - You are about to drop the column `supplyChainType` on the `entrepreneurships` table. All the data in the column will be lost.
  - You are about to drop the column `fixedCosts` on the `plans` table. All the data in the column will be lost.
  - You are about to drop the column `income` on the `plans` table. All the data in the column will be lost.
  - You are about to drop the column `investment` on the `plans` table. All the data in the column will be lost.
  - You are about to drop the column `profitability` on the `plans` table. All the data in the column will be lost.
  - You are about to drop the column `variableCosts` on the `plans` table. All the data in the column will be lost.
  - You are about to alter the column `discountRate` on the `plans` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Decimal(5,4)`.
  - You are about to alter the column `growthRate` on the `plans` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Decimal(5,4)`.
  - You are about to alter the column `inflationRate` on the `plans` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Decimal(5,4)`.
  - You are about to alter the column `priceGrowthRate` on the `plans` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Decimal(5,4)`.
  - You are about to alter the column `salaryIncreaseRate` on the `plans` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Decimal(5,4)`.

*/
-- AlterTable
ALTER TABLE "entrepreneurships" DROP COLUMN "commercialChannels",
DROP COLUMN "keyPartners",
DROP COLUMN "supplyChainType",
ADD COLUMN     "supplyChainMode" TEXT DEFAULT 'GUIDED';

-- AlterTable
ALTER TABLE "plans" DROP COLUMN "fixedCosts",
DROP COLUMN "income",
DROP COLUMN "investment",
DROP COLUMN "profitability",
DROP COLUMN "variableCosts",
ADD COLUMN     "benefitCostRatio" DECIMAL(5,2),
ADD COLUMN     "financialConclusion" TEXT,
ADD COLUMN     "financialRecommendations" TEXT,
ADD COLUMN     "financialRisks" TEXT,
ADD COLUMN     "paybackPeriod" TEXT,
ADD COLUMN     "tir" DECIMAL(5,4),
ADD COLUMN     "van" DECIMAL(15,2),
ALTER COLUMN "totalCost" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "netProfit" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "discountRate" SET DATA TYPE DECIMAL(5,4),
ALTER COLUMN "growthRate" SET DATA TYPE DECIMAL(5,4),
ALTER COLUMN "inflationRate" SET DATA TYPE DECIMAL(5,4),
ALTER COLUMN "priceGrowthRate" SET DATA TYPE DECIMAL(5,4),
ALTER COLUMN "salaryIncreaseRate" SET DATA TYPE DECIMAL(5,4);

-- CreateTable
CREATE TABLE "plan_demands" (
    "id" SERIAL NOT NULL,
    "planId" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,
    "monthlyDemand" INTEGER NOT NULL,
    "unitPrice" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "plan_demands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_equipments" (
    "id" SERIAL NOT NULL,
    "planId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(12,2) NOT NULL,
    "accountType" TEXT NOT NULL,
    "financingSource" TEXT NOT NULL,

    CONSTRAINT "plan_equipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_unit_costs" (
    "id" SERIAL NOT NULL,
    "planId" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,
    "monthlyQuantity" INTEGER NOT NULL,
    "unitCost" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "plan_unit_costs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_provisions" (
    "id" SERIAL NOT NULL,
    "planId" INTEGER NOT NULL,
    "item" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "monthlyQuantity" DECIMAL(12,2) NOT NULL,
    "unitPrice" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "plan_provisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_financing_items" (
    "id" SERIAL NOT NULL,
    "planId" INTEGER NOT NULL,
    "concept" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "source" TEXT NOT NULL,

    CONSTRAINT "plan_financing_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_projections" (
    "id" SERIAL NOT NULL,
    "planId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "revenue" DECIMAL(15,2) NOT NULL,
    "costs" DECIMAL(15,2) NOT NULL,
    "expenses" DECIMAL(15,2) NOT NULL,
    "ebit" DECIMAL(15,2) NOT NULL,
    "tax" DECIMAL(15,2) NOT NULL,
    "netProfit" DECIMAL(15,2) NOT NULL,
    "cashFlow" DECIMAL(15,2) NOT NULL,
    "cumulativeCashFlow" DECIMAL(15,2) NOT NULL,

    CONSTRAINT "plan_projections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "plan_demands" ADD CONSTRAINT "plan_demands_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_equipments" ADD CONSTRAINT "plan_equipments_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_unit_costs" ADD CONSTRAINT "plan_unit_costs_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_provisions" ADD CONSTRAINT "plan_provisions_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_financing_items" ADD CONSTRAINT "plan_financing_items_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_projections" ADD CONSTRAINT "plan_projections_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
