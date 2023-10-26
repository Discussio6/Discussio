-- DropForeignKey
ALTER TABLE `discussion` DROP FOREIGN KEY `Discussion_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `discussion` DROP FOREIGN KEY `Discussion_parent_id_fkey`;

-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `Like_discussion_id_fkey`;

-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `Like_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Discussion` ADD CONSTRAINT `Discussion_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `Discussion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Discussion` ADD CONSTRAINT `Discussion_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_discussion_id_fkey` FOREIGN KEY (`discussion_id`) REFERENCES `Discussion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
