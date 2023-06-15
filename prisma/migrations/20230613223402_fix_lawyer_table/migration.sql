/*
  Warnings:

  - You are about to drop the column `barNumberId` on the `Lawyer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lawyer" DROP CONSTRAINT "Lawyer_barNumberId_fkey";

-- AlterTable
ALTER TABLE "Lawyer" DROP COLUMN "barNumberId";

-- AddForeignKey
ALTER TABLE "Lawyer" ADD CONSTRAINT "Lawyer_BarNumberId_fkey" FOREIGN KEY ("BarNumberId") REFERENCES "BarNumber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
