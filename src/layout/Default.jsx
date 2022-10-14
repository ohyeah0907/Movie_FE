import React from 'react';
import { Header } from '../component/header/Header';
import { Footer } from '../component/footer/Footer';
import { Main } from '../component/main/Main';
import { BreadCrumb } from '../component/breadcrumb/BreadCrumb';

export const Default = () => {
  return (
    <>
      <Header />
      <BreadCrumb />
      <Main />
      <Footer />
    </>
  );
};
