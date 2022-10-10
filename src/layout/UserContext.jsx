import React from "react";
import { useState } from "react";

export const userContext = React.createContext();
const localUser = localStorage.getItem("user");

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(localUser ? JSON.parse(localUser) : {});

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
