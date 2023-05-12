import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { GetMovieFirstOptionUseCase } from 'app/useCases/getMovieFirstOption/GetMovieFirstOptionUseCase';
import { GetMovieSecondOptionUseCase } from 'app/useCases/getMovieSecondOption/GetMovieSecondOptionUseCase';

import { GetMovieDTO } from 'infra/http/dtos/GetMovieDTO';
import { MovieViewModel } from 'infra/http/view-models/MovieViewModel';

@Controller('movies')
export class MovieController {
  constructor(
    private getMovieFirstOptionUseCase: GetMovieFirstOptionUseCase,
    private getMovieSecondOptionUseCase: GetMovieSecondOptionUseCase,
  ) {}

  @Post()
  async getMovie(@Body() body: GetMovieDTO) {
    try {
      const { movie } = await this.getMovieFirstOptionUseCase.execute({
        name: body.name,
        tmdbId: body.tmdbId,
      });

      return {
        movie: MovieViewModel.toHTTP(movie),
      };
    } catch (error) {
      try {
        const { movie } = await this.getMovieSecondOptionUseCase.execute({
          name: body.name,
          tmdbId: body.tmdbId,
        });

        return {
          movie: MovieViewModel.toHTTP(movie),
        };
      } catch (error) {
        throw new HttpException('Movie not found!', HttpStatus.NOT_FOUND);
      }
    }
  }
}
