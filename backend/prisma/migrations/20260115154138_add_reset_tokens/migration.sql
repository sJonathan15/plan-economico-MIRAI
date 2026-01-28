/*
  Warnings:

  - Added the required column `productId` to the `plan_provisions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wizardId` to the `plan_unit_costs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "plan_provisions" ADD COLUMN     "productId" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "plan_unit_costs" ADD COLUMN     "wizardId" BIGINT NOT NULL;

-- CreateTable
CREATE TABLE "password_reset_tokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_tokens_token_key" ON "password_reset_tokens"("token");

-- AddForeignKey
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios_semillas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
