/*
  Warnings:

  - You are about to drop the column `description` on the `entrepreneurships` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `entrepreneurships` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "entrepreneurships" DROP COLUMN "description",
DROP COLUMN "imageUrl";
