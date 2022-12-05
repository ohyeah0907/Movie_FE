import { instance } from '../../constant/axios/Axios';
// import axios from 'axios';
export const signIn = async (username, password, signal) => {
  // Gọi api sign in
  return instance
    .post(
      '/auth/signin',
      { username, password },
      {
        signal,
      }
    )
    .catch((error) => {
      console.log(error);
    });
};
export const signUp = async (username, password, signal) => {
  //Gọi api sign up
  return instance
    .post(
      '/auth/signup',
      { username, password },
      {
        signal,
      }
    )
    .catch((error) => {
      console.log(error);
    });
};
