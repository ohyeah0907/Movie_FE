import { instance } from '../../constant/axios/Axios';
export const getUserDetail = (signal) => {
  instance
    .get('/user/detail', {
      signal,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};
