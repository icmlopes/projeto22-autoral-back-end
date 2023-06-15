/*
  Warnings:

  - You are about to drop the column `BarNumberId` on the `Lawyer` table. All the data in the column will be lost.
  - Added the required column `barNumberId` to the `Lawyer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Lawyer" DROP CONSTRAINT "Lawyer_BarNumberId_fkey";

-- AlterTable
ALTER TABLE "Lawyer" DROP COLUMN "BarNumberId",
ADD COLUMN     "barNumberId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Lawyer" ADD CONSTRAINT "Lawyer_barNumberId_fkey" FOREIGN KEY ("barNumberId") REFERENCES "BarNumber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
