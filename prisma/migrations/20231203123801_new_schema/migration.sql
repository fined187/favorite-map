/*
  Warnings:

  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Like_userId_storeId_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;

-- RenameIndex
ALTER INDEX "userId_storeId" RENAME TO "Like_userId_storeId_idx";
