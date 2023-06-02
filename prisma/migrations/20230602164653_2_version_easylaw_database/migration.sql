/*
  Warnings:

  - Added the required column `rg` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "birthPlace" VARCHAR(30),
ADD COLUMN     "maritalStatus" VARCHAR(30),
ADD COLUMN     "nationality" VARCHAR(30),
ADD COLUMN     "occupation" VARCHAR(100),
ADD COLUMN     "rg" VARCHAR(20) NOT NULL;
