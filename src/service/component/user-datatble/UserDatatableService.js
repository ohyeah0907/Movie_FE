import Swal from 'sweetalert2';
import { instance } from '../../../constant/axios/Axios';

export const getUsers = async () => {
  return await instance
    .get('/user/all', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: `Error ${error.response.status}`,
        text: "Something went wrong, can't get users!",
      });
    });
};
// export const addUser = async (requestBody) => {
//   return fetch(
//     `https://6344eda5dcae733e8fe69405.mockapi.io/api/movie-management/admin/user`,
//     {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(requestBody),
//     }
//   ).then((res) => {
//     if (res.ok)
//       Swal.fire({
//         icon: 'success',
//         title: 'Done',
//         text: 'Add user successfully',
//       });
//     else
//       Swal.fire({
//         icon: 'error',
//         title: `Error ${res.status}`,
//         text: 'Something went wrong, add user unsuccessfully!',
//       });
//   });
// };

// export const updateUser = (id, requestBody) => {
//   return fetch(
//     `https://6344eda5dcae733e8fe69405.mockapi.io/api/movie-management/admin/user/${id}`,
//     {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(requestBody),
//     }
//   ).then((res) => {
//     if (res.ok)
//       Swal.fire({
//         icon: 'success',
//         title: 'Done',
//         text: 'Update user successfully',
//       });
//     else
//       Swal.fire({
//         icon: 'error',
//         title: `Error ${res.status}`,
//         text: 'Something went wrong, update user unsuccessfully!',
//       });
//   });
// };
export const addUser = () => {};
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
export const deleteUser = async (id) => {
  return await instance
    .delete(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
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
