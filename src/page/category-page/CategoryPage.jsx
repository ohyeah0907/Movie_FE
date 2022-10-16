import React from 'react';
import { Link } from 'react-router-dom';
const listFilm = [
  {
    id: 634649,
    name: 'movie-1',
    isMovie: true,
  },
  { id: 436270, name: 'movie-2', isMovie: true },
];
export const CategoryPage = () => {
  return (
    <div>
      <div>CategoryPage</div>
      {listFilm.map((film) => (
        <Link to={`${film.id}?is-movie=${film.isMovie}`} key={film.id}>
          {film.name}
        </Link>
      ))}
    </div>
  );
};
