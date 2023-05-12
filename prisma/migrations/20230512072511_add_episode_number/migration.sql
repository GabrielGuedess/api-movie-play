/*
  Warnings:

  - A unique constraint covering the columns `[episodeNumber]` on the table `episodes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `episodeNumber` to the `episodes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "episodes" ADD COLUMN     "episodeNumber" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "episodes_episodeNumber_key" ON "episodes"("episodeNumber");
