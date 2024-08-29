/*
  Warnings:

  - You are about to drop the column `labTestReport` on the `medicalhistory` table. All the data in the column will be lost.
  - You are about to drop the column `labTestReportDoc` on the `medicalhistory` table. All the data in the column will be lost.
  - You are about to drop the column `problem` on the `medicalhistory` table. All the data in the column will be lost.
  - Added the required column `LabtestItems` to the `MedicalHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentProblem` to the `MedicalHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hospitalId` to the `MedicalHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `labtesttype` to the `MedicalHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refersToTest` to the `MedicalHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `medicalhistory` DROP COLUMN `labTestReport`,
    DROP COLUMN `labTestReportDoc`,
    DROP COLUMN `problem`,
    ADD COLUMN `LabtestItems` VARCHAR(191) NOT NULL,
    ADD COLUMN `bloodPressure` VARCHAR(191) NULL,
    ADD COLUMN `currentProblem` VARCHAR(191) NOT NULL,
    ADD COLUMN `hospitalId` INTEGER NOT NULL,
    ADD COLUMN `labtesttype` VARCHAR(191) NOT NULL,
    ADD COLUMN `refersToTest` BOOLEAN NOT NULL,
    ADD COLUMN `weight` DOUBLE NULL;

-- CreateTable
CREATE TABLE `LabTest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `labTestReportDoc` VARCHAR(191) NULL,
    `labTestReport` VARCHAR(191) NULL,
    `labTechnicianId` INTEGER NOT NULL,
    `medicalHistoryId` INTEGER NOT NULL,

    UNIQUE INDEX `LabTest_medicalHistoryId_key`(`medicalHistoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MedicalHistory` ADD CONSTRAINT `MedicalHistory_hospitalId_fkey` FOREIGN KEY (`hospitalId`) REFERENCES `Hospital`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LabTest` ADD CONSTRAINT `LabTest_labTechnicianId_fkey` FOREIGN KEY (`labTechnicianId`) REFERENCES `LabTechnician`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LabTest` ADD CONSTRAINT `LabTest_medicalHistoryId_fkey` FOREIGN KEY (`medicalHistoryId`) REFERENCES `MedicalHistory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
