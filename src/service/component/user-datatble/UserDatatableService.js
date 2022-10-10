import Swal from 'sweetalert2';

export const getUsers = () => {
  return fetch(
    'https://633f9ec4d1fcddf69ca601dd.mockapi.io/api/movie-management/user',
    { method: 'GET' }
  )
    .then((res) => {
      if (!res.ok)
        Swal.fire({
          icon: 'error',
          title: `Error ${res.status}`,
          text: 'Something went wrong!',
        });
      return res;
    })
    .then((res) => {
      if (res.ok) return res.json();
      else return Promise.resolve([]);
    });
};

export const updateUser = (id, requestBody) => {
  return fetch(
    `https://633f9ec4d1fcddf69ca601dd.mockapi.io/api/movie-management/user/${id}`,
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
      });
    else
      Swal.fire({
        icon: 'error',
        title: `Error ${res.status}`,
        text: 'Something went wrong!',
      });
  });
};

export const deleteUser = (id) => {
  return fetch(
    `https://633f9ec4d1fcddf69ca601dd.mockapi.io/api/movie-management/user/${id}`,
    { method: 'DELETE' }
  ).then((res) => {
    if (res.ok)
      Swal.fire({
        icon: 'success',
        title: 'Done',
      });
    else
      Swal.fire({
        icon: 'error',
        title: `Error ${res.status}`,
        text: 'Something went wrong!',
      });
  });
};
