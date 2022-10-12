import Swal from 'sweetalert2';

// Comment
export const getComments = () => {
  return fetch(
    'https://6344eda5dcae733e8fe69405.mockapi.io/api/movie-management/admin/comment',
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
export const addComment = (requestBody) => {
  return fetch(
    `https://6344eda5dcae733e8fe69405.mockapi.io/api/movie-management/admin/comment`,
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

export const updateComment = (id, requestBody) => {
  return fetch(
    `https://6344eda5dcae733e8fe69405.mockapi.io/api/movie-management/admin/comment/${id}`,
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

export const deleteComment = (id) => {
  return fetch(
    `https://6344eda5dcae733e8fe69405.mockapi.io/api/movie-management/admin/comment/${id}`,
    { method: 'DELETE' }
  ).then((res) => {
    if (res.ok)
      Swal.fire({
        icon: 'success',
        title: 'Done',
        text: 'Delete comment successfully',
      });
    else
      Swal.fire({
        icon: 'error',
        title: `Error ${res.status}`,
        text: 'Something went wrong, delete comment unsuccessfully!',
      });
  });
};

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
