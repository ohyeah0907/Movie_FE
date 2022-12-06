import { instance } from '../../constant/axios/Axios';
import Swal from 'sweetalert2';
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
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Done',
          text: 'Sign in successfully',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      return res;
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Failed',
        text: 'Username or password is not correct',
        showConfirmButton: false,
        timer: 1500,
      });
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
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Done',
          text: 'Sign up successfully',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      return res;
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Failed',
        text: 'Gmail has been used',
        showConfirmButton: false,
        timer: 1500,
      });
    });
};
export const resetPassword = async (username, signal) => {
  //Gọi api reset password
  return instance
    .post(
      '/mail/password/reset',
      { username },
      {
        signal,
      }
    )
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Done',
          text: 'Reset password successfully',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      return res;
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Failed',
        text: 'Username is wrong',
        showConfirmButton: false,
        timer: 1500,
      });
    });
};
