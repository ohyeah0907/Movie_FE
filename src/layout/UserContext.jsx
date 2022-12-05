import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { isExpired } from 'react-jwt';

export const userContext = React.createContext();
export const UserProvider = ({ children }) => {
  const [cookies] = useCookies(['refresh_token']);
  const [token, setToken] = useState({
    refreshToken: cookies.refresh_token,
  });

  const jwt = {
    token,
    handleToken: (token) => {
      setToken(token);
    },
  };

  return <userContext.Provider value={jwt}>{children}</userContext.Provider>;
};
