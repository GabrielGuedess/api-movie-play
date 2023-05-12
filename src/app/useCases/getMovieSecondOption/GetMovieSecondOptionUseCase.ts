import { Injectable } from '@nestjs/common';

import { JSDOM } from 'jsdom';

import { Movie } from 'app/entities/Movie';
import { MovieRepository } from 'app/repositories/MovieRepository';

interface GetMovieSecondOptionUseCaseRequest {
  name: string;
  tmdbId: number;
}

interface GetMovieFirstOptionUseCaseResponse {
  movie: Movie;
}

interface ConfigProps {
  id: string;
  cors: string;
}

@Injectable()
export class GetMovieSecondOptionUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute(
    request: GetMovieSecondOptionUseCaseRequest,
  ): Promise<GetMovieFirstOptionUseCaseResponse> {
    const { name, tmdbId } = request;

    try {
      const movieExist = await this.movieRepository.findMovie(tmdbId);

      if (movieExist) {
        return {
          movie: movieExist,
        };
      }

      const search = await JSDOM.fromURL(
        `https://overflix.pro/pesquisar/?p=${name}`,
      );

      const link = search.window.document.querySelector<HTMLAnchorElement>(
        '#collview .vbItemImage a',
      ).href;

      const { window } = await JSDOM.fromURL(`${link}/?area=online`);

      const anchorElement = window.document.querySelectorAll<HTMLAnchorElement>(
        '#baixar_menu .ipsMenu_item a',
      );

      const stream = await JSDOM.fromURL(anchorElement[1].href, {
        runScripts: 'dangerously',
      });

      const elementLink =
        stream.window.document.querySelector('#ideoooolink').innerHTML;

      const token = elementLink.split('token=')[1];

      const config: ConfigProps = stream.window.vidconfig;
      const cors = new URLSearchParams(config.cors);

      const linkMp4 = `https://streamtape.com/get_video?id=${
        config.id
      }&expires=${config.cors.split('expires=')[1].split('&')[0]}&ip=${cors.get(
        'ip',
      )}&token=${token}&stream=1`;

      const { url } = await fetch(linkMp4);

      const movie = new Movie({
        name,
        tmdbId,
        url,
        type: 'mp4',
      });

      const movieRepository = await this.movieRepository.create(movie);

      return {
        movie: movieRepository,
      };
    } catch (error) {
      throw error;
    }
  }
}
