import { instance } from '../../../constant/axios/Axios';
export const getAllGenres = async (signal) => {
  return await instance
    .get('/genres', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log(error);
    });
};
