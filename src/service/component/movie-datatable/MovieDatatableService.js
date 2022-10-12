import Swal from 'sweetalert2';

// Because the movie is managed by The MovieDB so we don't create admin section for movie
// Movie
export const getMovies = () => {
  return fetch(
    'https://6344eda5dcae733e8fe69405.mockapi.io/api/movie-management/admin/movie',
    { method: 'GET' }
  )
    .then((res) => {
      if (!res.ok)
        Swal.fire({
          icon: 'error',
          title: `Error ${res.status}`,
          text: "Something went wrong, can't get comments!",
        });
      return res;
    })
    .then((res) => {
      if (res.ok) return res.json();
      else return Promise.resolve([]);
    });
};
