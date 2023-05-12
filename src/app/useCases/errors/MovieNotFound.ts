export class MovieNotFound extends Error {
  constructor() {
    super('Movie not found.');
  }
}
