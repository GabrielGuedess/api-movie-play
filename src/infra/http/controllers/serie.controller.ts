import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { GetSerieFirstOptionUseCase } from 'app/useCases/getSerieFirstOption/GetSerieFirstOptionUseCase';
import { GetSerieSecondOptionUseCase } from 'app/useCases/getSerieSecondOption/GetSerieSecondOptionUseCase';

import { GetSerieDTO } from 'infra/http/dtos/GetSerieDTO';
import { SerieViewModel } from 'infra/http/view-models/SerieViewModel';

@Controller('series')
export class SerieController {
  constructor(
    private getSerieFirstOptionUseCase: GetSerieFirstOptionUseCase,
    private getSerieSecondOptionUseCase: GetSerieSecondOptionUseCase,
  ) {}

  @Post()
  async getMovie(@Body() body: GetSerieDTO) {
    try {
      const { serie } = await this.getSerieFirstOptionUseCase.execute({
        name: body.name,
        tmdbId: body.tmdbId,
        seasonNumber: body.seasonNumber,
        episodeNumber: body.episodeNumber,
      });

      return {
        serie: SerieViewModel.toHTTP(serie),
      };
    } catch {
      try {
        const { serie } = await this.getSerieSecondOptionUseCase.execute({
          name: body.name,
          tmdbId: body.tmdbId,
          seasonNumber: body.seasonNumber,
          episodeNumber: body.episodeNumber,
        });

        return {
          serie: SerieViewModel.toHTTP(serie),
        };
      } catch (error) {
        throw new HttpException('Serie not found!', HttpStatus.NOT_FOUND);
      }
    }
  }
}
