/*
  Warnings:

  - You are about to drop the column `tmdbId` on the `episodes` table. All the data in the column will be lost.
  - You are about to drop the column `tmdbId` on the `seasons` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "episodes_tmdbId_key";

-- DropIndex
DROP INDEX "seasons_tmdbId_key";

-- AlterTable
ALTER TABLE "episodes" DROP COLUMN "tmdbId";

-- AlterTable
ALTER TABLE "seasons" DROP COLUMN "tmdbId";
