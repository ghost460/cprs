/*
  Warnings:

  - Added the required column `doc_number` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `patient` ADD COLUMN `doc_number` VARCHAR(191) NOT NULL;
