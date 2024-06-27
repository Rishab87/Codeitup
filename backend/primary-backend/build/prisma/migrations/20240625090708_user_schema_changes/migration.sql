/*
  Warnings:

  - You are about to drop the column `githubUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `instagramUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `linkedinUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `youtubeUrl` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "githubUrl",
DROP COLUMN "instagramUrl",
DROP COLUMN "linkedinUrl",
DROP COLUMN "youtubeUrl",
ADD COLUMN     "bio" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "socials" JSONB NOT NULL DEFAULT '{ "linkedinUrl": "", "githubUrl": "", "instagramUrl": "", "youtubeUrl": ""}';
