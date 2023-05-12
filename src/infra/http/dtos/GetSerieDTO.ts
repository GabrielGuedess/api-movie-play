import { IsNotEmpty } from 'class-validator';

export abstract class GetSerieDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  tmdbId: number;

  @IsNotEmpty()
  seasonNumber: number;

  @IsNotEmpty()
  episodeNumber: number;
}
