/*
  Warnings:

  - You are about to drop the column `tmdId` on the `movies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tmdbId]` on the table `movies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tmdbId` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "movies_tmdId_key";

-- AlterTable
ALTER TABLE "movies" DROP COLUMN "tmdId",
ADD COLUMN     "tmdbId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "movies_tmdbId_key" ON "movies"("tmdbId");
