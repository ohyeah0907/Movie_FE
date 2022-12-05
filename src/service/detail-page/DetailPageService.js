import { API } from '../../constant/api-moviedb/API';

// Movie
export const getDetailMovie = (id, signal) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API.key}&language=en-US`,
    { signal: signal }
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

export const getDetailMovieVideo = (id, signal) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API.key}&language=en-US`,
    { signal: signal }
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

// TV series
export const getDetailTVSeason = (id, seasonId, signal) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/season/${seasonId}?api_key=${API.key}&language=en-US`,
    { signal: signal }
  )
    .then((res) => {
      if (!res.ok) {
        console.log(res.statusText);
        return Promise.reject(new Error(res.statusText));
      }
      return Promise.resolve(res);
    })
    .then((res) => {
      return res.json();
    });
};

export const getDetailTV = (id, signal) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${API.key}&language=en-US`,
    { signal: signal }
  )
    .then((res) => {
      if (!res.ok) {
        console.log(res.statusText);
        return Promise.reject(new Error(res.statusText));
      }
      return Promise.resolve(res);
    })
    .then((res) => {
      return res.json();
    });
};
export const getDetailTVVideo = (id, signal) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/videos?api_key=ce736ab4fea294c5b16d004f7375584d&language=en-US`,
    { signal: signal }
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
