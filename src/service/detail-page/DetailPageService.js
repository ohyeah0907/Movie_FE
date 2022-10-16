import { API } from '../../constant/api/API';

export const getDetailMovie = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API.key}&language=en-US`
  )
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(new Error(res.statusText));
      }
      return Promise.resolve(res);
    })
    .then((res) => {
      return res.json();
    });
};

export const getDetailMovieVideo = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API.key}&language=en-US`
  )
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(new Error(res.statusText));
      }
      return Promise.resolve(res);
    })
    .then((res) => {
      return res.json();
    });
};

export const getDetailTVSeason = (id, seasonId) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/season/${seasonId}?api_key=${API.key}&language=en-US`
  )
    .then((res) => {
      if (!res.ok) {
        console.log(res.statusText);
        return new Promise.resolve({});
      }
      return res.json();
    })
    .then((data) => {
      return data;
    });
};
