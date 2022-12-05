import { API } from '../constant/api-moviedb/API';

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
    this.poster = API.IMAGE_URL + poster;
    this.backdrop = API.IMAGE_URL + backdrop;
    this.rating = rating;
    this.star = star;
    this.genres = genres;
    this.overview = overview;
    this.seasons = seasons;
    this.trailer = 'https://www.youtube.com/embed/' + trailer;
  }
}
