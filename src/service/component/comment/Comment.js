export const getComments = (movieId, signal) => {
  return fetch(
    'https://633f9ec4d1fcddf69ca601dd.mockapi.io/api/movie-management/comment',
    { signal: signal }
  )
    .then((res) => {
      if (!res.ok) return Promise.reject(new Error(res.statusText));
      return Promise.resolve(res);
    })
    .then((res) => {
      return res.json();
    });
};

export const addComment = (requestBody, signal) => {
  return fetch(
    'https://633f9ec4d1fcddf69ca601dd.mockapi.io/api/movie-management/comment',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
      signal: signal,
    }
  ).then((res) => {
    if (!res.ok) return Promise.reject(new Error(res.statusText));
    return Promise.resolve(res);
  });
};
