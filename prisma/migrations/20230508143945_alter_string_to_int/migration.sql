/*
  Warnings:

  - Changed the type of `tmdId` on the `movies` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "movies" DROP COLUMN "tmdId",
ADD COLUMN     "tmdId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "movies_tmdId_key" ON "movies"("tmdId");
