import { instance } from '../../constant/axios/Axios';

export const addToWishlist = (movieId, signal) => {
  return instance
    .post(`/wishlists/add/${movieId}`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      signal,
    })
    .catch((error) => {
      console.log(error);
    });
};
