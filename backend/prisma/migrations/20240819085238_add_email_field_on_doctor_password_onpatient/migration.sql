/*
  Warnings:

  - You are about to drop the column `address` on the `patient` table. All the data in the column will be lost.
  - Added the required column `add_area` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `add_district` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `add_munciplity` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `add_province` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `add_wardno` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `patient` DROP COLUMN `address`,
    ADD COLUMN `add_area` VARCHAR(191) NOT NULL,
    ADD COLUMN `add_district` VARCHAR(191) NOT NULL,
    ADD COLUMN `add_munciplity` VARCHAR(191) NOT NULL,
    ADD COLUMN `add_province` VARCHAR(191) NOT NULL,
    ADD COLUMN `add_wardno` INTEGER NOT NULL;
