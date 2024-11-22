/*
  Warnings:

  - Made the column `phone` on table `friends` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "friends" ALTER COLUMN "phone" SET NOT NULL;
