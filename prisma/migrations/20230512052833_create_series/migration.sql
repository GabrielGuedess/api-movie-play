-- CreateTable
CREATE TABLE "series" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seasons" (
    "id" TEXT NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "seasonNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "serieId" TEXT NOT NULL,

    CONSTRAINT "seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "episodes" (
    "id" TEXT NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seasonId" TEXT NOT NULL,

    CONSTRAINT "episodes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "series_name_key" ON "series"("name");

-- CreateIndex
CREATE UNIQUE INDEX "series_tmdbId_key" ON "series"("tmdbId");

-- CreateIndex
CREATE UNIQUE INDEX "seasons_tmdbId_key" ON "seasons"("tmdbId");

-- CreateIndex
CREATE UNIQUE INDEX "seasons_seasonNumber_key" ON "seasons"("seasonNumber");

-- CreateIndex
CREATE UNIQUE INDEX "episodes_tmdbId_key" ON "episodes"("tmdbId");

-- CreateIndex
CREATE UNIQUE INDEX "episodes_name_key" ON "episodes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "episodes_url_key" ON "episodes"("url");

-- AddForeignKey
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "seasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
