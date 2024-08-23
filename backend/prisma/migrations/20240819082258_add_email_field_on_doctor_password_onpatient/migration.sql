/*
  Warnings:

  - You are about to drop the column `patientId` on the `user` table. All the data in the column will be lost.
  - The values [PATIENT] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `email` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_patientId_fkey`;

-- AlterTable
ALTER TABLE `doctor` ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `patient` ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `patientId`,
    MODIFY `role` ENUM('DOCTOR', 'LAB_TECHNICIAN', 'ADMIN') NOT NULL;
