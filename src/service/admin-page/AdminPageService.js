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
