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
        text: 'Add comment successfully',
      });
    else
      Swal.fire({
        icon: 'error',
        title: `Error ${res.status}`,
        text: 'Something went wrong, add comment unsuccessfully!',
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
        text: 'Update comment successfully',
      });
    else
      Swal.fire({
        icon: 'error',
        title: `Error ${res.status}`,
        text: 'Something went wrong, update comment unsuccessfully!',
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
