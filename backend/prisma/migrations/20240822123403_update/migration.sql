-- CreateTable
CREATE TABLE `DoctorHospital` (
    `doctorId` INTEGER NOT NULL,
    `hospitalId` INTEGER NOT NULL,

    PRIMARY KEY (`doctorId`, `hospitalId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DoctorHospital` ADD CONSTRAINT `DoctorHospital_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoctorHospital` ADD CONSTRAINT `DoctorHospital_hospitalId_fkey` FOREIGN KEY (`hospitalId`) REFERENCES `Hospital`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
