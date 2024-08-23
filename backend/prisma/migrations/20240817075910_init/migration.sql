/*
  Warnings:

  - You are about to drop the column `hospitalAdminId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `hospitaladmin` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[HospitalId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_hospitalAdminId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `hospitalAdminId`,
    ADD COLUMN `HospitalId` INTEGER NULL;

-- DropTable
DROP TABLE `hospitaladmin`;

-- CreateTable
CREATE TABLE `Hospital` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hospitalName` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `numberOfBeds` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `specialization` VARCHAR(191) NOT NULL,
    `organizationalType` VARCHAR(191) NOT NULL,
    `levelOfCare` VARCHAR(191) NOT NULL,
    `servicesOfferedId` INTEGER NOT NULL,
    `availableEquipmentsId` INTEGER NOT NULL,
    `contactNumbersId` INTEGER NOT NULL,

    UNIQUE INDEX `Hospital_servicesOfferedId_key`(`servicesOfferedId`),
    UNIQUE INDEX `Hospital_availableEquipmentsId_key`(`availableEquipmentsId`),
    UNIQUE INDEX `Hospital_contactNumbersId_key`(`contactNumbersId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServicesOffered` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emergency` BOOLEAN NOT NULL,
    `surgical` BOOLEAN NOT NULL,
    `diagnostic` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AvailableEquipments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `xray` BOOLEAN NOT NULL,
    `mri` BOOLEAN NOT NULL,
    `ctScanner` BOOLEAN NOT NULL,
    `ecg` BOOLEAN NOT NULL,
    `endoscopy` BOOLEAN NOT NULL,
    `ventilator` BOOLEAN NOT NULL,
    `cpap` BOOLEAN NOT NULL,
    `bipap` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactNumbers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reception` VARCHAR(191) NOT NULL,
    `infoOfficer` VARCHAR(191) NOT NULL,
    `emergency` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_HospitalId_key` ON `User`(`HospitalId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_HospitalId_fkey` FOREIGN KEY (`HospitalId`) REFERENCES `Hospital`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hospital` ADD CONSTRAINT `Hospital_servicesOfferedId_fkey` FOREIGN KEY (`servicesOfferedId`) REFERENCES `ServicesOffered`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hospital` ADD CONSTRAINT `Hospital_availableEquipmentsId_fkey` FOREIGN KEY (`availableEquipmentsId`) REFERENCES `AvailableEquipments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hospital` ADD CONSTRAINT `Hospital_contactNumbersId_fkey` FOREIGN KEY (`contactNumbersId`) REFERENCES `ContactNumbers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
