export class TVSeries {
  constructor(
    id = 0,
    name = '',
    poster = '',
    backdrop = '',
    rating = 0,
    star = 0,
    genres = [],
    overview = '',
    seasons = 1,
    trailer = ''
  ) {
    this.id = id;
    this.name = name;
    this.poster = 'https://image.tmdb.org/t/p/original/' + poster;
    this.backdrop = 'https://image.tmdb.org/t/p/original/' + backdrop;
    this.rating = rating;
    this.star = star;
    this.genres = genres;
    this.overview = overview;
    this.seasons = seasons;
    this.trailer = 'https://www.youtube.com/embed/' + trailer;
  }
}
