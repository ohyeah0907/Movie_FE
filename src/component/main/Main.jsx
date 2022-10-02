import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../../page/home-page/HomePage';
import { CategoryPage } from '../../page/category-page/CategoryPage';
import { DetailPage } from '../../page/detail-page/DetailPage';
import { ProfilePage } from '../../page/profile-page/ProfilePage';
import { ListPage } from '../../page/list-page/ListPage';
import { SignInPage } from '../../page/sign-in-page/SignInPage';
import { SignUpPage } from '../../page/sign-up-page/SignUpPage';

export const Main = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} index />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/category/:movieId" element={<DetailPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};
