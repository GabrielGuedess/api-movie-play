import { Body, Controller, Post } from '@nestjs/common';

import { GetSerieFirstOptionUseCase } from 'app/useCases/getSerieFirstOption/GetSerieFirstOptionUseCase';

import { GetSerieDTO } from 'infra/http/dtos/GetSerieDTO';

@Controller('series')
export class SerieController {
  constructor(private getSerieFirstOptionUseCase: GetSerieFirstOptionUseCase) {}

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
        serie: serie,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
