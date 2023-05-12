import { Movie } from 'app/entities/Movie';

export class MovieViewModel {
  static toHTTP(movie: Movie) {
    return {
      id: movie.id,
      name: movie.name,
      tmdbId: movie.tmdbId,
      type: movie.type,
      url: movie.url,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
    };
  }
}
