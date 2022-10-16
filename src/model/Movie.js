export class Movie {
  constructor(
    id = 0,
    name = '',
    poster = '',
    backdrop = '',
    rating = 0,
    star = 0,
    genres = [],
    overview = '',
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
    this.trailer = 'https://www.youtube.com/embed/' + trailer;
  }
}
