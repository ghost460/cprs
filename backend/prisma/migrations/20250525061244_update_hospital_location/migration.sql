/*
  Warnings:

  - You are about to drop the column `address` on the `hospital` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `hospital` DROP COLUMN `address`,
    ADD COLUMN `district` VARCHAR(191) NULL,
    ADD COLUMN `latitude` DOUBLE NULL,
    ADD COLUMN `longitude` DOUBLE NULL,
    ADD COLUMN `municipality` VARCHAR(191) NULL,
    ADD COLUMN `province` VARCHAR(191) NULL,
    ADD COLUMN `street` VARCHAR(191) NULL,
    ADD COLUMN `wardNo` INTEGER NULL;
