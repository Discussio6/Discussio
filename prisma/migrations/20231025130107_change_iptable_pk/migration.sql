/*
  Warnings:

  - The primary key for the `iptable` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `IPTable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `iptable` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`ip`, `id`);
