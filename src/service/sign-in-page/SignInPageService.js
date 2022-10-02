// Test if client get user through sign in
export const getUser = () => {
  return fetch('http://localhost:8080/api/user-management/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) throw Error(res.statusText);
      return res;
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};
