/*
  Warnings:

  - Made the column `doctorPrescription` on table `medicalhistory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `medicalhistory` ADD COLUMN `doctorId` INTEGER NULL,
    MODIFY `doctorPrescription` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `MedicalHistory` ADD CONSTRAINT `MedicalHistory_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
