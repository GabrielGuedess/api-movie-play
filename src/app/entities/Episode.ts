export interface EpisodeProps {
  id?: string;
  name: string;
  tmdbId: number;
  url: string;
  type: string;
  episodeNumber: number;
  updatedAt?: Date;
  createdAt?: Date;
}

export class Episode {
  private props: EpisodeProps;

  constructor(props: EpisodeProps) {
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

  public set url(url: string) {
    this.props.url = url;
  }

  public get url(): string {
    return this.props.url;
  }

  public set type(type: string) {
    this.props.type = type;
  }

  public get type(): string {
    return this.props.type;
  }

  public set tmdbId(tmdbId: number) {
    this.props.tmdbId = tmdbId;
  }

  public get tmdbId(): number {
    return this.props.tmdbId;
  }

  public set episodeNumber(episodeNumber: number) {
    this.props.episodeNumber = episodeNumber;
  }

  public get episodeNumber(): number {
    return this.props.episodeNumber;
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
