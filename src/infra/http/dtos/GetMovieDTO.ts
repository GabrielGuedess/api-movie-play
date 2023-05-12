import { IsNotEmpty } from 'class-validator';

export abstract class GetMovieDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  tmdbId: number;
}
