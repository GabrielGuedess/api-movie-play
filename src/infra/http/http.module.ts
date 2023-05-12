import { Module } from '@nestjs/common';

import { GetMovieFirstOptionUseCase } from 'app/useCases/getMovieFirstOption/GetMovieFirstOptionUseCase';
import { GetMovieSecondOptionUseCase } from 'app/useCases/getMovieSecondOption/GetMovieSecondOptionUseCase';
import { GetSerieFirstOptionUseCase } from 'app/useCases/getSerieFirstOption/GetSerieFirstOptionUseCase';

import { DatabaseModule } from 'infra/database/database.module';

import { MovieController } from './controllers/movie.controller';
import { SerieController } from './controllers/serie.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [MovieController, SerieController],
  providers: [
    GetMovieFirstOptionUseCase,
    GetMovieSecondOptionUseCase,
    GetSerieFirstOptionUseCase,
  ],
})
export class HttpModule {}
