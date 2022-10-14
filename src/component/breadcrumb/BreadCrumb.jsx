import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const BreadCrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((pathname) => pathname);
  return (
    <div>
      <Link to="/">home</Link>
      {pathnames
        ? pathnames.map((pathname, index) => (
            <Link to={pathnames.slice(0, index + 1).join('/')} key={index}>
              /{pathname}
            </Link>
          ))
        : ''}
    </div>
  );
};
