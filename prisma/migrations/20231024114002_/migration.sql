/*
  Warnings:

  - You are about to drop the `likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `Likes_discussion_id_fkey`;

-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `Likes_userId_fkey`;

-- DropTable
DROP TABLE `likes`;

-- CreateTable
CREATE TABLE `Like` (
    `discussion_id` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `cAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`discussion_id`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_discussion_id_fkey` FOREIGN KEY (`discussion_id`) REFERENCES `Discussion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
