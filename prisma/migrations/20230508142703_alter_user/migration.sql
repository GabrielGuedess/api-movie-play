/*
  Warnings:

  - You are about to drop the column `tmdId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url]` on the table `movies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tmdId]` on the table `movies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tmdId` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "tmdId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "tmdId";

-- CreateIndex
CREATE UNIQUE INDEX "movies_url_key" ON "movies"("url");

-- CreateIndex
CREATE UNIQUE INDEX "movies_tmdId_key" ON "movies"("tmdId");
