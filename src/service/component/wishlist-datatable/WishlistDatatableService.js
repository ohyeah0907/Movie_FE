import Swal from 'sweetalert2';

// Comment
export const getWishlists = () => {
  return fetch(
    'https://6346a80f745bd0dbd383014b.mockapi.io/api/movie-management/admin/wish-list',
    { method: 'GET' }
  )
    .then((res) => {
      if (!res.ok)
        Swal.fire({
          icon: 'error',
          title: `Error ${res.status}`,
          text: "Something went wrong, can't get wishlists!",
        });
      return res;
    })
    .then((res) => {
      if (res.ok) return res.json();
      else return Promise.resolve([]);
    });
};
export const addWishlist = (requestBody) => {
  return fetch(
    'https://6346a80f745bd0dbd383014b.mockapi.io/api/movie-management/admin/wish-list',
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
        text: 'Add wishlist successfully',
      });
    else
      Swal.fire({
        icon: 'error',
        title: `Error ${res.status}`,
        text: 'Something went wrong, add wishlist unsuccessfully!',
      });
  });
};

export const updateWishlist = (id, requestBody) => {
  return fetch(
    `https://6346a80f745bd0dbd383014b.mockapi.io/api/movie-management/admin/wish-list/${id}`,
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
        text: 'Update wishlist successfully',
      });
    else
      Swal.fire({
        icon: 'error',
        title: `Error ${res.status}`,
        text: 'Something went wrong, update wishlist unsuccessfully!',
      });
  });
};

export const deleteWishlist = (id) => {
  return fetch(
    `https://6346a80f745bd0dbd383014b.mockapi.io/api/movie-management/admin/wish-list/${id}`,
    { method: 'DELETE' }
  ).then((res) => {
    if (res.ok)
      Swal.fire({
        icon: 'success',
        title: 'Done',
        text: 'Delete wishlist successfully',
      });
    else
      Swal.fire({
        icon: 'error',
        title: `Error ${res.status}`,
        text: 'Something went wrong, delete wishlist unsuccessfully!',
      });
  });
};
