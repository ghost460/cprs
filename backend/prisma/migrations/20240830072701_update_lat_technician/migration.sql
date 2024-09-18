-- AlterTable
ALTER TABLE `labtechnician` ADD COLUMN `hospitalId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `LabTechnician` ADD CONSTRAINT `LabTechnician_hospitalId_fkey` FOREIGN KEY (`hospitalId`) REFERENCES `Hospital`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
