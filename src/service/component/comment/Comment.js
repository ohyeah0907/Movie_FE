import { instance } from '../../../constant/axios/Axios';

export const getComments = (movieId, signal) => {
  return fetch(
    'https://633f9ec4d1fcddf69ca601dd.mockapi.io/api/movie-management/comment',
    { signal: signal }
  )
    .then((res) => {
      if (!res.ok) return Promise.reject(new Error(res.statusText));
      return Promise.resolve(res);
    })
    .then((res) => {
      return res.json();
    });
};

export const addComment = async (requestBody, movieId, signal) => {
  return instance
    .post(`/comments/add/${movieId}`, requestBody, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      signal,
    })
    .catch((error) => {
      console.log(error);
    });
};
