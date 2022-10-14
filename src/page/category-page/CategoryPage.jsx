import React from 'react';
import { Link } from 'react-router-dom';
const listProduct = [
  {
    id: 1,
    name: 'samsung',
  },
  { id: 2, name: 'apple' },
];
export const CategoryPage = () => {
  return (
    <div>
      <div>CategoryPage</div>
      {listProduct.map((product) => (
        <Link to={`${product.id}`} key={product.id}>
          {product.name}
        </Link>
      ))}
    </div>
  );
};
