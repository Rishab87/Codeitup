/*
  Warnings:

  - You are about to drop the column `minSpace` on the `Question` table. All the data in the column will be lost.
  - The `testCases` column on the `Question` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `examples` column on the `Question` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `config` on the `Question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "minSpace",
DROP COLUMN "testCases",
ADD COLUMN     "testCases" JSONB[],
DROP COLUMN "examples",
ADD COLUMN     "examples" JSONB[],
DROP COLUMN "config",
ADD COLUMN     "config" JSONB NOT NULL;
