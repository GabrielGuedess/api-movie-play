import { Movie as RawMovie } from '@prisma/client';

import { Movie } from 'app/entities/Movie';

export class PrismaMovieMapper {
  static toPrisma(movie: Movie) {
    return {
      name: movie.name,
      tmdbId: movie.tmdbId,
      type: movie.type,
      url: movie.url,
      updatedAt: movie.updatedAt,
    };
  }

  static toDomain(raw: RawMovie): Movie {
    return new Movie({
      name: raw.name,
      tmdbId: raw.tmdbId,
      type: raw.type,
      url: raw.url,
      updatedAt: raw.updatedAt,
      createdAt: raw.createdAt,
      id: raw.id,
    });
  }
}
