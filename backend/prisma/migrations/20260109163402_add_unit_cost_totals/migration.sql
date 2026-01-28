-- AlterTable
ALTER TABLE "plan_unit_costs" ADD COLUMN     "total" DECIMAL(12,2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "plans" ADD COLUMN     "totalAnnualUnitCost" DECIMAL(12,2),
ADD COLUMN     "totalMonthlyUnitCost" DECIMAL(12,2);
