import Swal from 'sweetalert2';

export const getUsers = () => {
  return fetch(
    'https://6344eda5dcae733e8fe69405.mockapi.io/api/movie-management/admin/user',
    { method: 'GET' }
  )
    .then((res) => {
      if (!res.ok)
        Swal.fire({
          icon: 'error',
          title: `Error ${res.status}`,
          text: "Something went wrong, can't get users!",
        });
      return res;
    })
    .then((res) => {
      if (res.ok) return res.json();
      else return Promise.resolve([]);
    });
};
export const addUser = (requestBody) => {
  return fetch(
    `https://6344eda5dcae733e8fe69405.mockapi.io/api/movie-management/admin/user`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    }
  ).then((res) => {
    if (res.ok)
      Swal.fire({
        icon: 'success',
        title: 'Done',
        text: 'Add user successfully',
      });
    else
      Swal.fire({
        icon: 'error',
        title: `Error ${res.status}`,
        text: 'Something went wrong, add user unsuccessfully!',
      });
  });
};

export const updateUser = (id, requestBody) => {
  return fetch(
    `https://6344eda5dcae733e8fe69405.mockapi.io/api/movie-management/admin/user/${id}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    }
  ).then((res) => {
    if (res.ok)
      Swal.fire({
        icon: 'success',
        title: 'Done',
        text: 'Update user successfully',
      });
    else
      Swal.fire({
        icon: 'error',
        title: `Error ${res.status}`,
        text: 'Something went wrong, update user unsuccessfully!',
      });
  });
};

export const deleteUser = (id) => {
  return fetch(
    `https://6344eda5dcae733e8fe69405.mockapi.io/api/movie-management/admin/user/${id}`,
    { method: 'DELETE' }
  ).then((res) => {
    if (res.ok)
      Swal.fire({
        icon: 'success',
        title: 'Done',
        text: 'Delete user successfully',
      });
    else
      Swal.fire({
        icon: 'error',
        title: `Error ${res.status}`,
        text: 'Something went wrong, delete user unsuccessfully!',
      });
  });
};
