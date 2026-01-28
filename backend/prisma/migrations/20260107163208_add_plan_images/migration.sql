-- AlterTable
ALTER TABLE "entrepreneurships" ADD COLUMN     "rucNumber" TEXT;

-- CreateTable
CREATE TABLE "plan_images" (
    "id" SERIAL NOT NULL,
    "planId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plan_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "plan_images" ADD CONSTRAINT "plan_images_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
