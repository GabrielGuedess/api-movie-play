import { Serie } from 'app/entities/Serie';

export class SerieViewModel {
  static toHTTP(serie: Serie) {
    return {
      id: serie.id,
      name: serie.name,
      tmdbId: serie.tmdbId,
      createdAt: serie.createdAt,
      updatedAt: serie.updatedAt,

      season: {
        seasonNumber: serie.season.seasonNumber,
        episode: {
          name: serie.season.episode.name,
          url: serie.season.episode.url,
          type: serie.season.episode.type,
          episodeNumber: serie.season.episode.episodeNumber,
        },
      },
    };
  }
}
