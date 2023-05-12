import { Module } from '@nestjs/common';

import { MovieRepository } from 'app/repositories/MovieRepository';
import { SerieRepository } from 'app/repositories/SerieRepository';

import { PrismaMovieRepository } from 'infra/database/prisma/repositories/PrismaMovieRepository';
import { PrismaSerieRepository } from 'infra/database/prisma/repositories/PrismaSerieRepository';

import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: MovieRepository,
      useClass: PrismaMovieRepository,
    },
    {
      provide: SerieRepository,
      useClass: PrismaSerieRepository,
    },
  ],
  exports: [MovieRepository, SerieRepository],
})
export class DatabaseModule {}
