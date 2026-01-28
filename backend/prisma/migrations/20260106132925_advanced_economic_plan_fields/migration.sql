-- AlterTable
ALTER TABLE "entrepreneurships" ADD COLUMN     "commercializationChannels" TEXT,
ADD COLUMN     "customerBenefits" TEXT,
ADD COLUMN     "differentiation" TEXT,
ADD COLUMN     "mainActivity" TEXT,
ADD COLUMN     "productiveFocus" TEXT,
ADD COLUMN     "socialImpact" TEXT;

-- AlterTable
ALTER TABLE "plans" ADD COLUMN     "discountRate" DECIMAL(5,2),
ADD COLUMN     "growthRate" DECIMAL(5,2),
ADD COLUMN     "inflationRate" DECIMAL(5,2),
ADD COLUMN     "priceGrowthRate" DECIMAL(5,2),
ADD COLUMN     "salaryIncreaseRate" DECIMAL(5,2);

-- CreateTable
CREATE TABLE "key_partners" (
    "id" SERIAL NOT NULL,
    "entrepreneurshipId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "role" TEXT,

    CONSTRAINT "key_partners_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "key_partners" ADD CONSTRAINT "key_partners_entrepreneurshipId_fkey" FOREIGN KEY ("entrepreneurshipId") REFERENCES "entrepreneurships"("id") ON DELETE CASCADE ON UPDATE CASCADE;
