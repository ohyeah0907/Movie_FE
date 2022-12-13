import axios from 'axios';
import { isExpired } from 'react-jwt';

// Tạo config axios
export const instance = axios.create({
  baseURL: 'https://movie-rnr-spring-boot.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
instance.interceptors.request.use(
  async (config) => {
    if (config.headers['Authorization']) {
      if (
        isExpired(config.headers['Authorization'].substring('Bearer '.length))
      ) {
        // Gọi api refresh token
        const refreshToken = document.cookie.replace('refresh_token=', '');
        const accessToken = await axios
          .post('http://localhost:8080/api/auth/refreshtoken', {
            refreshToken,
          })
          .then((res) => {
            return res.accessToken;
          })
          .catch((error) => Promise.resolve(error));
        localStorage.setItem('access_token', accessToken);
        config.headers = {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        };
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// instance.interceptors.response.use(
//   (res) => {
//     return res.data;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
