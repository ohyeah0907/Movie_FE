import { HomePage } from '../page/home-page/HomePage';
import { CategoryPage } from '../page/category-page/CategoryPage';
import { ListPage } from '../page/list-page/ListPage';
import { SignInPage } from '../page/sign-in-page/SignInPage';

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
];
