import { Episode } from 'app/entities/Episode';

export interface SeasonProps {
  id?: string;
  seasonNumber: number;
  episode: Episode;
  updatedAt?: Date;
  createdAt?: Date;
}

export class Season {
  private props: SeasonProps;

  constructor(props: SeasonProps) {
    this.props = props;
  }

  public get id(): string {
    return this.props.id;
  }

  public set seasonNumber(seasonNumber: number) {
    this.props.seasonNumber = seasonNumber;
  }

  public get seasonNumber(): number {
    return this.props.seasonNumber;
  }

  public set episode(episode: Episode) {
    this.props.episode = episode;
  }

  public get episode(): Episode {
    return this.props.episode;
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
