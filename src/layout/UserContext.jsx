import React from 'react';
import { useState } from 'react';

export const userContext = React.createContext();
const localUser = localStorage.getItem('user');

export const UserContext = ({ children }) => {
  const [user, setUser] = useState(localUser ? JSON.parse(localUser) : {});
  console.log('run context');
  console.log(user);
  const globalUser = {
    ...user,
    handleUser: (user) => {
      setUser(user);
    },
  };

  return (
    <userContext.Provider value={globalUser}>{children}</userContext.Provider>
  );
};
