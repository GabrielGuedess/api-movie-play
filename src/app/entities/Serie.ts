import { Season } from 'app/entities/Season';

export interface SerieProps {
  id?: string;
  name: string;
  tmdbId: number;
  season: Season;
  updatedAt?: Date;
  createdAt?: Date;
}

export class Serie {
  private props: SerieProps;

  constructor(props: SerieProps) {
    this.props = props;
  }

  public get id(): string {
    return this.props.id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set tmdbId(tmdbId: number) {
    this.props.tmdbId = tmdbId;
  }

  public get tmdbId(): number {
    return this.props.tmdbId;
  }

  public set season(season: Season) {
    this.props.season = season;
  }

  public get season(): Season {
    return this.props.season;
  }

  public set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
