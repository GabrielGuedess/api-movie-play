import { Injectable } from '@nestjs/common';

import { JSDOM } from 'jsdom';

import { Movie } from 'app/entities/Movie';
import { MovieRepository } from 'app/repositories/MovieRepository';

interface GetMovieFirstOptionUseCaseRequest {
  name: string;
  tmdbId: number;
}

interface GetMovieFirstOptionUseCaseResponse {
  movie: Movie;
}

interface IdProps {
  id: number;
  imdb_id: string;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
}

@Injectable()
export class GetMovieFirstOptionUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute(
    request: GetMovieFirstOptionUseCaseRequest,
  ): Promise<GetMovieFirstOptionUseCaseResponse> {
    const { name, tmdbId } = request;

    const movieExist = await this.movieRepository.findMovie(tmdbId);

    if (movieExist) {
      return {
        movie: movieExist,
      };
    }

    const { imdb_id }: IdProps = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/${tmdbId}/external_ids?api_key=${process.env.TMDB_API_KEY}`,
      )
    ).json();

    const search = await JSDOM.fromURL(
      `https://embedflix.net/filme/${imdb_id}`,
    );

    try {
      const pageId = search.window.document
        .querySelector<HTMLDivElement>('.player_select_item')
        .getAttribute('data-id');

      const player = await (
        await fetch(
          `https://embedflix.net/api?action=getPlayer&video_id=${pageId}`,
          {
            method: 'POST',
          },
        )
      ).json();

      const pageFrame = await JSDOM.fromURL(player.data.video_url);

      const bodyPage = pageFrame.window.document.body.textContent.trim();

      const { videoSources } = JSON.parse(
        `{${bodyPage.split('"videoImage":null,')[1].split('}}, false')[0]}}`,
      );

      const masterTxtUrl = `https://playembeds.com/${
        videoSources[0].file.split('https://1/')[1]
      }?s=1&d=`;

      const videoUrl = await (
        await fetch(masterTxtUrl, {
          headers: {
            accept: '*/*',
            Referer: 'https://playembeds.com',
          },
        })
      ).text();

      const lines = videoUrl.split(/[\r\n]/);

      const url = lines
        .slice()
        .reverse()
        .find(item => item.includes('https'));

      const movie = new Movie({
        name,
        tmdbId,
        url,
        type: 'm3u8',
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
