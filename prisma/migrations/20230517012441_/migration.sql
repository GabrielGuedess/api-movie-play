/*
  Warnings:

  - A unique constraint covering the columns `[tmdbId]` on the table `series` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "series_tmdbId_key" ON "series"("tmdbId");
