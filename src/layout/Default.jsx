import React from 'react';
import { Header } from '../component/header/Header';
import { Footer } from '../component/footer/Footer';
import { Main } from '../component/main/Main';

export const Default = () => {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
