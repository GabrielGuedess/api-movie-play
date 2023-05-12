import { Serie } from 'app/entities/Serie';

export abstract class SerieRepository {
  abstract create(serie: Serie): Promise<Serie>;
  abstract findSerie(
    tmdbId: number,
    seasonNumber: number,
    episodeNumber: number,
  ): Promise<Serie | null>;
}
