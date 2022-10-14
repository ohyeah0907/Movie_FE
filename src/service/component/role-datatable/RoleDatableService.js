import Swal from 'sweetalert2';

export const getRoles = () => {
  return fetch(
    'https://6344eda5dcae733e8fe69405.mockapi.io/api/movie-management/admin/role',
    { method: 'GET' }
  )
    .then((res) => {
      if (!res.ok)
        Swal.fire({
          icon: 'error',
          title: `Error ${res.status}`,
          text: "Something went wrong, can't get roles!",
        });
      return res;
    })
    .then((res) => {
      if (res.ok) return res.json();
      else return Promise.resolve([]);
    });
};
export const addRole = (requestBody) => {
  return fetch(
    `https://6344eda5dcae733e8fe69405.mockapi.io/api/movie-management/admin/role`,
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
        text: 'Add role successfully',
      });
    else
      Swal.fire({
        icon: 'error',
        title: `Error ${res.status}`,
        text: 'Something went wrong, add role unsuccessfully!',
      });
  });
};

export const updateRole = (id, requestBody) => {
  return fetch(
    `https://6344eda5dcae733e8fe69405.mockapi.io/api/movie-management/admin/role/${id}`,
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
        text: 'Update role successfully',
      });
    else
      Swal.fire({
        icon: 'error',
        title: `Error ${res.status}`,
        text: 'Something went wrong, update role unsuccessfully!',
      });
  });
};

export const deleteRole = (id) => {
  return fetch(
    `https://6344eda5dcae733e8fe69405.mockapi.io/api/movie-management/admin/role/${id}`,
    { method: 'DELETE' }
  ).then((res) => {
    if (res.ok)
      Swal.fire({
        icon: 'success',
        title: 'Done',
        text: 'Delete role successfully',
      });
    else
      Swal.fire({
        icon: 'error',
        title: `Error ${res.status}`,
        text: 'Something went wrong, delete role unsuccessfully!',
      });
  });
};
