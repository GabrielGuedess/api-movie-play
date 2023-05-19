import { Injectable } from '@nestjs/common';

import { Serie } from 'app/entities/Serie';
import { SerieRepository } from 'app/repositories/SerieRepository';
import { PrismaSerieMapper } from 'infra/database/prisma/mappers/PrismaSerieMapper';

import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaSerieRepository implements SerieRepository {
  constructor(private prisma: PrismaService) {}
  async create(serie: Serie): Promise<Serie> {
    const serieExist = await this.prisma.serie.findUnique({
      where: {
        tmdbId: serie.tmdbId,
      },
      include: {
        Season: {
          include: {
            Episode: true,
          },
        },
      },
    });

    const seasonExist = await this.prisma.season.findFirst({
      where: {
        seasonNumber: serie.season.seasonNumber,
        serie: {
          tmdbId: serie.tmdbId,
        },
      },
    });

    const episodeExist = await this.prisma.episode.findFirst({
      where: {
        episodeNumber: serie.season.episode.episodeNumber,
        season: {
          seasonNumber: serie.season.seasonNumber,
          serie: {
            tmdbId: serie.tmdbId,
          },
        },
      },
    });

    if (serieExist && seasonExist && episodeExist) {
      return PrismaSerieMapper.toDomain(
        serieExist,
        serieExist.Season[0],
        serieExist.Season[0].Episode[0],
      );
    }

    if (!serieExist) {
      console.log(serie.name);
      const seriePrisma = await this.prisma.serie.upsert({
        where: {
          tmdbId: serie.tmdbId,
        },
        update: {
          name: serie.name,
          tmdbId: serie.tmdbId,
          updatedAt: serie.updatedAt,

          Season: {
            create: {
              seasonNumber: serie.season.seasonNumber,

              Episode: {
                create: {
                  name: serie.season.episode.name,
                  url: serie.season.episode.url,
                  type: serie.season.episode.type,
                  episodeNumber: serie.season.episode.episodeNumber,
                },
              },
            },
          },
        },
        create: {
          name: serie.name,
          tmdbId: serie.tmdbId,
          updatedAt: serie.updatedAt,

          Season: {
            create: {
              seasonNumber: serie.season.seasonNumber,

              Episode: {
                create: {
                  name: serie.season.episode.name,
                  url: serie.season.episode.url,
                  type: serie.season.episode.type,
                  episodeNumber: serie.season.episode.episodeNumber,
                },
              },
            },
          },
        },

        include: {
          Season: {
            include: {
              Episode: true,
            },
          },
        },
      });

      return PrismaSerieMapper.toDomain(
        seriePrisma,
        seriePrisma.Season[0],
        seriePrisma.Season[0].Episode[0],
      );
    }

    if (!seasonExist) {
      const seasonPrisma = await this.prisma.season.create({
        data: {
          serie: {
            connect: {
              id: serieExist.id,
            },
          },
          seasonNumber: serie.season.seasonNumber,
          Episode: {
            create: {
              name: serie.season.episode.name,
              url: serie.season.episode.url,
              type: serie.season.episode.type,
              episodeNumber: serie.season.episode.episodeNumber,
            },
          },
        },
        include: {
          Episode: true,
        },
      });

      return PrismaSerieMapper.toDomain(
        serieExist,
        seasonPrisma,
        seasonPrisma.Episode[0],
      );
    }

    if (!episodeExist) {
      const episodePrisma = await this.prisma.episode.create({
        data: {
          season: {
            connect: {
              id: seasonExist.id,
            },
          },
          name: serie.season.episode.name,
          url: serie.season.episode.url,
          type: serie.season.episode.type,
          episodeNumber: serie.season.episode.episodeNumber,
        },
      });

      return PrismaSerieMapper.toDomain(serieExist, seasonExist, episodePrisma);
    }
  }

  async findSerie(
    tmdbId: number,
    seasonNumber: number,
    episodeNumber: number,
  ): Promise<Serie | null> {
    const seriePrisma = await this.prisma.serie.findFirst({
      include: {
        Season: {
          include: {
            Episode: true,
          },
        },
      },
      where: {
        tmdbId,
        Season: {
          some: {
            seasonNumber,
            Episode: {
              some: {
                episodeNumber,
              },
            },
          },
        },
      },
    });

    if (!seriePrisma) {
      return null;
    }

    return PrismaSerieMapper.toDomain(
      seriePrisma,
      seriePrisma.Season[0],
      seriePrisma.Season[0].Episode[0],
    );
  }
}
