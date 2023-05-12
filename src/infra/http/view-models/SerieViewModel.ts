import { Serie } from 'app/entities/Serie';

export class SerieViewModel {
  static toHTTP(serie: Serie) {
    return {
      id: serie.id,
      name: serie.name,
      tmdbId: serie.tmdbId,
      createdAt: serie.createdAt,
      updatedAt: serie.updatedAt,
    };
  }
}
