import { instance } from '../../constant/axios/Axios';

export const getFilmByName = (name, signal) => {
  return instance
    .get(`/movies/find/${name}`, { signal })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};
