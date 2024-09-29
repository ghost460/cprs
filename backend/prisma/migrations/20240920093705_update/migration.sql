-- AlterTable
ALTER TABLE `medicalhistory` ADD COLUMN `diseasecatagory` VARCHAR(191) NOT NULL DEFAULT 'Infectious Diseases',
    ADD COLUMN `diseasesubcatagory` VARCHAR(191) NOT NULL DEFAULT 'Bacterial Infections';
