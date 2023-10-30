-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_parent_comment_id_fkey` FOREIGN KEY (`parent_comment_id`) REFERENCES `Comment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
