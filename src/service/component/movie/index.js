import { instance } from '../../../constant/axios/Axios';
export const getAllMovie = async (signal) => {
  return await instance
    .get('/movies/all', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getMovieDetail = async (movieID) => {
  return await instance
    .get('/movies/all', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log(error);
    });
};
