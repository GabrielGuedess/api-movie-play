import { Injectable } from '@nestjs/common';

import { Movie } from 'app/entities/Movie';
import { MovieRepository } from 'app/repositories/MovieRepository';
import { PrismaMovieMapper } from 'infra/database/prisma/mappers/PrismaMovieMapper';

import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaMovieRepository implements MovieRepository {
  constructor(private prisma: PrismaService) {}

  async create(movie: Movie): Promise<Movie> {
    const movieExist = await this.prisma.movie.findUnique({
      where: {
        tmdbId: movie.tmdbId,
      },
    });

    if (movieExist) {
      return PrismaMovieMapper.toDomain(movieExist);
    }

    const moviePrisma = await this.prisma.movie.create({
      data: PrismaMovieMapper.toPrisma(movie),
    });

    return PrismaMovieMapper.toDomain(moviePrisma);
  }

  async findMovie(tmdbId: number): Promise<Movie | null> {
    const moviePrisma = await this.prisma.movie.findUnique({
      where: {
        tmdbId,
      },
    });

    if (!moviePrisma) {
      return null;
    }

    return PrismaMovieMapper.toDomain(moviePrisma);
  }
}
