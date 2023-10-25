-- CreateTable
CREATE TABLE `IPTable` (
    `ip` VARCHAR(191) NOT NULL,
    `exiresAt` DATETIME(3) NOT NULL,
    `cAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`ip`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `cAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `mAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DiscussionToTag` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_DiscussionToTag_AB_unique`(`A`, `B`),
    INDEX `_DiscussionToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_DiscussionToTag` ADD CONSTRAINT `_DiscussionToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Discussion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DiscussionToTag` ADD CONSTRAINT `_DiscussionToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;
