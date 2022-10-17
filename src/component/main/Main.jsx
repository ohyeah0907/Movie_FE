import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  CategoryPage,
  DetailPage,
  ProfilePage,
  ListPage,
  SignInPage,
  SignUpPage,
  AdminPage,
} from "../../page";

// import { CategoryPage } from "../../page/category-page/CategoryPage";
// import { DetailPage } from "../../page/detail-page/DetailPage";
// import { ProfilePage } from "../../page/profile-page/ProfilePage";
// import { ListPage } from "../../page/list-page/ListPage";
// import { SignInPage } from "../../page/sign-in-page/SignInPage";
// import { SignUpPage } from "../../page/sign-up-page/SignUpPage";
// import { AdminPage } from "../../page/admin-page/AdminPage";
export const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} index />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/category/:movieId" element={<DetailPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
};
