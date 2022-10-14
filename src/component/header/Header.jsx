import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../routes/routes';
import { userContext } from '../../layout/UserContext';

export const Header = () => {
  const [navHeader, setNavHeader] = useState(routes);
  const user = useContext(userContext);

  const handleSignOut = () => {
    user.handleUser({});
    localStorage.clear();
    reverseHide();
  };

  // reverse property hide of object
  const reverseHide = () => {
    setNavHeader((prev) => {
      return prev.map((route) => {
        if (route.hasOwnProperty('hide')) {
          route.hide = !route.hide;
          return route;
        } else return route;
      });
    });
  };

  useEffect(() => {
    if (user.name) reverseHide();
  }, [user]);

  return (
    <div>
      <div>{user.name ? user.name : ''}</div>
      {navHeader.map((route) => {
        if (route.hasOwnProperty('hide')) {
          if (route.hide === false) {
            return (
              <Link to={route.path} key={route.text}>
                {route.text}
              </Link>
            );
          }
        } else
          return (
            <Link to={route.path} key={route.text}>
              {route.text}
            </Link>
          );
        return null;
      })}
      {user.name ? <button onClick={handleSignOut}>Sign out</button> : ''}
    </div>
  );
};
