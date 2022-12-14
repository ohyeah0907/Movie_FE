import React, { useContext } from 'react';
import { Header } from '../component/header/Header';
import { Footer } from '../component/footer/Footer';
import { Main } from '../component/main/Main';
// import { BreadCrumb } from "../component/breadcrumb/BreadCrumb";
import { decodeToken } from 'react-jwt';
import { userContext } from './UserContext';

export const Default = () => {
  const context = useContext(userContext);
  console.log('Default');
  const currentUser = decodeToken(localStorage.getItem('access_token'));
  return (
    <>
      {!currentUser ? (
        <Header />
      ) : (
        currentUser.sub == 'admin@gmail.com' || <Header />
      )}
      <Main />
      <Footer />
    </>
  );
};
