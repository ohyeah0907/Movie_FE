import React from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

export const userContext = React.createContext();
export const UserProvider = ({ children }) => {
  const [cookies] = useCookies(['refresh_token']);
  const [token, setToken] = useState({
    refreshToken: cookies.refresh_token,
  });
  console.log('UserContext');
  const jwt = {
    token,
    handleToken: (token) => {
      setToken(token);
    },
  };

  return <userContext.Provider value={jwt}>{children}</userContext.Provider>;
};
