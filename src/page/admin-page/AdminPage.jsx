import React from 'react';
import AdminLTE, { Sidebar, Navbar } from 'adminlte-2-react';
import clsx from 'clsx';
import styles from './css/admin-page.module.scss';
import user from '../../assets/image/user.png';
import { UserDatatable } from '../../component/admin/user-datatable/UserDatatable';

const { Item, Header, UserPanel } = Sidebar;
const { Entry } = Navbar;
const sidebar = [
  <UserPanel
    username={'Admin'}
    imageUrl={user}
    status={'online'}
    statusType={'success'}
    key={'user-panel'}
  />,
  <Header text={'View'} key={'view'} />,
  <Item
    text={'Datatable'}
    children={[<Item text={'User'} to={'/user'} key="user" />]}
    key={'datatable'}
  />,
];

export const AdminPage = () => {
  return (
    <div className={clsx(styles.adminContainer)}>
      <AdminLTE title={['Admin', ' page']} theme="black" sidebar={sidebar}>
        <Navbar.Core>
          <Entry
            icon="fa-sign-out-alt"
            onClick={() => {
              console.log('button log out is clicked');
            }}
          ></Entry>
        </Navbar.Core>
        <UserDatatable path={'/user'} />
      </AdminLTE>
    </div>
  );
};
