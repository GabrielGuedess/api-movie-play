import {
  Serie as RawSerie,
  Season as RawSeason,
  Episode as RawEpisode,
} from '@prisma/client';

import { Episode } from 'app/entities/Episode';
import { Season } from 'app/entities/Season';
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
    };
  }

  static toDomain(
    serieRaw: RawSerie,
    seasonRaw: RawSeason,
    episodeRaw: RawEpisode,
  ): Serie {
    return new Serie({
      id: serieRaw.id,
      name: serieRaw.name,
      tmdbId: serieRaw.tmdbId,
      updatedAt: serieRaw.updatedAt,
      createdAt: serieRaw.createdAt,

      season: new Season({
        seasonNumber: seasonRaw.seasonNumber,

        episode: new Episode({
          name: episodeRaw.name,
          url: episodeRaw.url,
          type: episodeRaw.type,
          episodeNumber: episodeRaw.episodeNumber,
        }),
      }),
    });
  }
}
