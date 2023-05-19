import { Injectable } from '@nestjs/common';

import { JSDOM } from 'jsdom';

import { EpisodesDTO } from 'app/dtos/EpisodesDTO';
import { Episode } from 'app/entities/Episode';
import { Season } from 'app/entities/Season';
import { Serie } from 'app/entities/Serie';
import { SerieRepository } from 'app/repositories/SerieRepository';

interface GetSerieSecondOptionUseCaseRequest {
  name: string;
  tmdbId: number;
  seasonNumber: number;
  episodeNumber: number;
}

interface GetSerieFirstOptionUseCaseResponse {
  serie: Serie;
}

interface ConfigProps {
  id: string;
  cors: string;
}

@Injectable()
export class GetSerieSecondOptionUseCase {
  constructor(private serieRepository: SerieRepository) {}

  async execute(
    request: GetSerieSecondOptionUseCaseRequest,
  ): Promise<GetSerieFirstOptionUseCaseResponse> {
    const { name, tmdbId, seasonNumber, episodeNumber } = request;

    try {
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

      const { episodes }: EpisodesDTO = await (
        await fetch(
          `https://api.themoviedb.org/3/tv/${tmdbId}/season/${seasonNumber}?api_key=${process.env.TMDB_API_KEY}&language=pt-BR`,
        )
      ).json();

      const episode = episodes.find(
        item => item.episode_number === episodeNumber,
      );

      const search = await JSDOM.fromURL(
        `https://overflix.pro/pesquisar/?p=${name}`,
      );

      const link = search.window.document.querySelector<HTMLAnchorElement>(
        '#collview .vbItemImage a',
      ).href;

      const seasonEp = await JSDOM.fromURL(link);

      const anchorEp = Array.from(
        seasonEp.window.document.querySelectorAll<HTMLAnchorElement>(
          '#listagem li a',
        ),
      );

      const formattedNumber = episodeNumber.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

      const anchorLink = anchorEp.find(
        el => el.textContent === `Episódio ${formattedNumber}`,
      ).href;

      const { window } = await JSDOM.fromURL(anchorLink);

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

      const serie = new Serie({
        name,
        tmdbId,

        season: new Season({
          seasonNumber,
          updatedAt: new Date(),

          episode: new Episode({
            episodeNumber,
            url,
            name: episode.name,
            type: 'mp4',
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
