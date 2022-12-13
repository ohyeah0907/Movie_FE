import Swal from 'sweetalert2';
import { instance } from '../../../constant/axios/Axios';

export const getUsers = async (signal) => {
  return await instance
    .get('/user/all', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      signal,
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: `Error ${error.response.status}`,
        text: "Something went wrong, can't get users!",
      });
    });
};

export const addUser = async (requestBody, signal) => {
  return await instance
    .post('/auth/signup', requestBody, { signal })
    .then((res) => {
      if (res.status == 200)
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: 'Add user successfully',
        });
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: `Error ${error.response.status}`,
        text: 'Something went wrong, add user unsuccessfully!',
      });
    });
};
// export const deleteUser = (id) => {
//   return fetch(
//     `https://6344eda5dcae733e8fe69405.mockapi.io/api/movie-management/admin/user/${id}`,
//     { method: 'DELETE' }
//   ).then((res) => {
//     if (res.ok)
//       Swal.fire({
//         icon: 'success',
//         title: 'Done',
//         text: 'Delete user successfully',
//       });
//     else
//       Swal.fire({
//         icon: 'error',
//         title: `Error ${res.status}`,
//         text: 'Something went wrong, delete user unsuccessfully!',
//       });
//   });
// };
export const deleteUser = async (id, signal) => {
  return await instance
    .delete(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      signal,
    })
    .then((res) => {
      if (res.status == 200)
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: 'Delete user successfully',
        });
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: `Error ${error.response.status}`,
        text: 'Something went wrong, delete user unsuccessfully!',
      });
    });
};
