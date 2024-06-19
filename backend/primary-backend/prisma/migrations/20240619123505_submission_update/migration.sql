/*
  Warnings:

  - Added the required column `code` to the `Submissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Submissions" ADD COLUMN     "code" TEXT NOT NULL;
