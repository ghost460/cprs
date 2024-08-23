/*
  Warnings:

  - Added the required column `doc_type` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fathername` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `patient` ADD COLUMN `doc_type` ENUM('CITIZENSHIP', 'DRIVING_LICENSE', 'PASSPORT', 'BIRTH_CERTIFICATE') NOT NULL,
    ADD COLUMN `fathername` VARCHAR(191) NOT NULL;
