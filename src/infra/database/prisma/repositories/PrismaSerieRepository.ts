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
    });

    if (serieExist) {
      return PrismaSerieMapper.toDomain(serieExist);
    }

    const seriePrisma = await this.prisma.serie.create({
      data: PrismaSerieMapper.toPrisma(serie),
    });

    return PrismaSerieMapper.toDomain(seriePrisma);
  }

  async findSerie(
    tmdbId: number,
    seasonNumber: number,
    episodeNumber: number,
  ): Promise<Serie | null> {
    const seriePrisma = await this.prisma.serie.findFirst({
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

    return PrismaSerieMapper.toDomain(seriePrisma);
  }
}
