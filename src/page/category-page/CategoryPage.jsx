import React from 'react';
import { Link } from 'react-router-dom';
const listFilm = [
  {
    id: 1,
    name: 'movie-1',
  },
  { id: 2, name: 'movie-2' },
];
export const CategoryPage = () => {
  return (
    <div>
      <div>CategoryPage</div>
      {listFilm.map((film) => (
        <Link to={`${film.id}`} key={film.id}>
          {film.name}
        </Link>
      ))}
    </div>
  );
};
