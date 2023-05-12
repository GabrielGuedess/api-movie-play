import { Serie as RawSerie } from '@prisma/client';

import { Serie } from 'app/entities/Serie';

export class PrismaSerieMapper {
  static toPrisma(serie: Serie) {
    return {
      name: serie.name,
      tmdbId: serie.tmdbId,
      updatedAt: serie.updatedAt,

      Season: {
        create: {
          seasonNumber: serie.season.seasonNumber,
          tmdbId: serie.season.tmdbId,

          Episode: {
            create: {
              name: serie.season.episode.name,
              tmdbId: serie.season.episode.tmdbId,
              url: serie.season.episode.url,
              type: serie.season.episode.type,
              episodeNumber: serie.season.episode.episodeNumber,
            },
          },
        },
      },
    };
  }

  static toDomain(serieRaw: RawSerie): Serie {
    return new Serie({
      id: serieRaw.id,
      name: serieRaw.name,
      tmdbId: serieRaw.tmdbId,
      updatedAt: serieRaw.updatedAt,
      createdAt: serieRaw.createdAt,
    });
  }
}
