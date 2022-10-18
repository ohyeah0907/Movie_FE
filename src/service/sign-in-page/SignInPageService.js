// Test if client get user through sign in
export const getUser = () => {
  return fetch(
    'https://633f9ec4d1fcddf69ca601dd.mockapi.io/api/movie-management/user',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then((res) => {
      if (!res.ok) throw Error(res.statusText);
      return res;
    })
    .then((res) => {
      return res.json();
    });
};
