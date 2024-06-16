/*
  Warnings:

  - You are about to drop the column `title` on the `Submissions` table. All the data in the column will be lost.
  - Added the required column `config` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "config" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Submissions" DROP COLUMN "title";
