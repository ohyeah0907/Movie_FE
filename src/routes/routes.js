import { HomePage } from '../page/home-page/HomePage';
import { CategoryPage } from '../page/category-page/CategoryPage';
import { ListPage } from '../page/list-page/ListPage';
import { ProfilePage } from '../page/profile-page/ProfilePage';
import { SignInPage } from '../page/sign-in-page/SignInPage';
import { SignUpPage } from '../page/sign-up-page/SignUpPage';
import { SearchPage } from '../page/search-page/SearchPage';

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
    path: '/list',
    component: ListPage,
    text: 'My List',
    hide: true,
  },
  {
    path: '/sign-in',
    component: SignInPage,
    text: 'Sign In',
    hide: false,
  },

  // {
  //   path: '/sign-up',
  //   component: SignUpPage,
  //   text: 'Sign Up',
  //   hide: false,
  // },
  // {
  //   path: '/profile',
  //   component: ProfilePage,
  //   text: 'Profile',
  //   hide: true,
  // },
];
