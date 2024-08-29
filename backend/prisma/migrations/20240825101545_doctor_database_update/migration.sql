/*
  Warnings:

  - A unique constraint covering the columns `[contactNo]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[licenseNo]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Doctor_contactNo_key` ON `Doctor`(`contactNo`);

-- CreateIndex
CREATE UNIQUE INDEX `Doctor_email_key` ON `Doctor`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Doctor_licenseNo_key` ON `Doctor`(`licenseNo`);
