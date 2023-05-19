import { Injectable } from '@nestjs/common';

import { JSDOM } from 'jsdom';

import { EpisodesDTO } from 'app/dtos/EpisodesDTO';
import { Episode } from 'app/entities/Episode';
import { Season } from 'app/entities/Season';
import { Serie } from 'app/entities/Serie';
import { SerieRepository } from 'app/repositories/SerieRepository';

interface GetSerieFirstOptionUseCaseRequest {
  name: string;
  tmdbId: number;
  seasonNumber: number;
  episodeNumber: number;
}

interface GetSerieFirstOptionUseCaseResponse {
  serie: Serie;
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
export class GetSerieFirstOptionUseCase {
  constructor(private serieRepository: SerieRepository) {}

  async execute(
    request: GetSerieFirstOptionUseCaseRequest,
  ): Promise<GetSerieFirstOptionUseCaseResponse> {
    const { name, tmdbId, seasonNumber, episodeNumber } = request;

    const serieExist = await this.serieRepository.findSerie(
      tmdbId,
      seasonNumber,
      episodeNumber,
    );

    if (serieExist) {
      return {
        serie: serieExist,
      };
    }

    const { imdb_id }: IdProps = await (
      await fetch(
        `https://api.themoviedb.org/3/tv/${tmdbId}/external_ids?api_key=${process.env.TMDB_API_KEY}`,
      )
    ).json();

    const { episodes }: EpisodesDTO = await (
      await fetch(
        `https://api.themoviedb.org/3/tv/${tmdbId}/season/${seasonNumber}?api_key=${process.env.TMDB_API_KEY}&language=pt-BR`,
      )
    ).json();

    const episode = episodes.find(
      item => item.episode_number === episodeNumber,
    );

    const search = await JSDOM.fromURL(
      `https://embedflix.net/serie/${imdb_id}/${seasonNumber}/${episodeNumber}`,
    );

    try {
      const optionId = search.window.document
        .querySelector<HTMLDivElement>('.episodeOption.active')
        .getAttribute('data-contentid');

      const getOptions = await (
        await fetch(
          `https://embedflix.net/api?action=getOptions&contentid=${optionId}`,
          {
            method: 'POST',
          },
        )
      ).json();

      const player = await (
        await fetch(
          `https://embedflix.net/api?action=getPlayer&video_id=${getOptions.data.options[0].ID}`,
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

      const serie = new Serie({
        name,
        tmdbId,
        season: new Season({
          seasonNumber,
          episode: new Episode({
            name: episode.name,
            url,
            type: 'm3au8',
            episodeNumber,
          }),
        }),
      });

      const serieRepository = await this.serieRepository.create(serie);

      return {
        serie: serieRepository,
      };
    } catch (error) {
      throw error;
    }
  }
}
