import { Movie } from 'app/entities/Movie';

export abstract class MovieRepository {
  abstract create(movie: Movie): Promise<Movie>;
  abstract findMovie(tmdbId: number): Promise<Movie | null>;
}
