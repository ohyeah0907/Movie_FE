import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  HomePage,
  CategoryPage,
  DetailPage,
  ProfilePage,
  ListPage,
  SignInPage,
  SignUpPage,
  AdminPage,
  ErrorPage,
} from '../../page';
import { SearchPage } from '../../page/search-page/SearchPage';

export const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} index />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/watch/:movieId" element={<DetailPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        {/* <Route path="/sign-up" element={<SignUpPage />} /> */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};
