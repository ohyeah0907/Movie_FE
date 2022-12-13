import { instance } from '../../../constant/axios/Axios';

export const getComments = (movieId, signal) => {
  return instance.get(`movies/${movieId}`, { signal }).catch((error) => {
    console.log(error);
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

export const deleteComment = async (commentId, signal) => {
  console.log(commentId);
  return instance
    .delete(`/comments/delete/${commentId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      signal,
    })
    .catch((error) => {
      console.log(error);
    });
};
