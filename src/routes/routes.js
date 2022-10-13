import { HomePage } from '../page/home-page/HomePage';
import { CategoryPage } from '../page/category-page/CategoryPage';
import { ListPage } from '../page/list-page/ListPage';
import { ProfilePage } from '../page/profile-page/ProfilePage';
import { SignInPage } from '../page/sign-in-page/SignInPage';
import { SignUpPage } from '../page/sign-up-page/SignUpPage';
import { AdminPage } from '../page/admin-page/AdminPage';

export var routes = [
  {
    path: '/',
    component: HomePage,
    text: 'Home',
  },
  {
    path: '/category',
    component: CategoryPage,
    text: 'Category',
  },
  {
    path: '/sign-in',
    component: SignInPage,
    text: 'Sign In',
    hide: false,
  },
  {
    path: '/sign-up',
    component: SignUpPage,
    text: 'Sign Up',
    hide: false,
  },
  {
    path: '/profile',
    component: ProfilePage,
    text: 'Profile',
    hide: true,
  },
  {
    path: '/list',
    component: ListPage,
    text: 'List',
    hide: true,
  },
];
