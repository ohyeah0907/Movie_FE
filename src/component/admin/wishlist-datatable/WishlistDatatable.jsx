import React, { useEffect, useState, useRef } from 'react';
import {
  Content,
  Box,
  Row,
  Col,
  DataTable,
  Button,
  Inputs,
  ButtonGroup,
} from 'adminlte-2-react';
import clsx from 'clsx';
import styles from './css/wishlist-datatable.module.css';
import {
  getWishlists,
  addWishlist,
  deleteWishlist,
  updateWishlist,
} from '../../../service/component/wishlist-datatable/WishlistDatatableService';
import { getUsers } from '../../../service/component/user-datatble/UserDatatableService';
import { getMovies } from '../../../service/component/movie-datatable/MovieDatatableService';

const { Text } = Inputs;
const firstColumns = [
  { title: 'id', data: 'id' },
  { title: "User's id", data: 'user_id' },
  { title: "Movie's id", data: 'movie_id' },
  {
    title: 'Actions',
    data: null,
    render: () => (
      <>
        <Button text="Delete" className="on-delete-event" margin />
        <Button text="Update" className="on-update-event" margin></Button>
      </>
    ),
  },
];
const userColumns = [
  { title: 'id', data: 'id' },
  { title: 'Name', data: 'name' },
  { title: 'Password', data: 'password' },
  { title: 'RoleId', data: 'roleId' },
  {
    title: 'Actions',
    data: null,
    render: () => (
      <Button text="Choose" className="on-choose-event" onClick={() => {}} />
    ),
  },
];
const movieColumns = [
  { title: 'id', data: 'id' },
  { title: 'Name', data: 'name' },
  { title: 'Datetime', data: 'datetime' },
  { title: 'Vote average', data: 'vote_average' },
  {
    title: 'Actions',
    data: null,
    render: () => (
      <Button text="Choose" className="on-choose-event" onClick={() => {}} />
    ),
  },
];
export const WishlistDatatable = () => {
  const [data, setData] = useState();
  const [dataUpdate, setDataUpdate] = useState();
  const [dataAdd, setDataAdd] = useState(false);
  const [inputAdd, setinputAdd] = useState({});
  //Foreign key in table
  const users = useRef({});
  const movies = useRef({});

  useEffect(() => {
    getDataFirstTime();
  }, []);

  const getDataFirstTime = async () => {
    await getUsers().then((data) => (users.current = data));
    await getMovies().then((data) => (movies.current = data));
    await getWishlists().then((data) => setData(data));
  };

  return (
    <Content title={'Wishlist'}>
      <Row>
        <Col xs={12}>
          {/* Add Form */}
          {dataAdd ? (
            <Box title={'Add Form'} collapsed collapsable>
              <div className={clsx(styles.fixIcon)}>
                <Text
                  name="user-id-add-form"
                  placeholder={inputAdd.user_id ? inputAdd.user_id : ''}
                  label="User's id"
                  labelPosition="above"
                  disabled
                />
                <DataTable
                  columns={userColumns}
                  data={users.current}
                  options={{
                    paging: true,
                    lengthChange: false,
                    searching: false,
                    ordering: true,
                    info: true,
                    autoWidth: false,
                  }}
                  border
                  onClickEvents={{
                    onChooseEvent: (data, rowIdx, rowData) => {
                      setinputAdd((prev) => ({
                        ...prev,
                        user_id: data.id,
                      }));
                    },
                  }}
                />
                <Text
                  name="movie-id-add-form"
                  placeholder={inputAdd.movie_id ? inputAdd.movie_id : ''}
                  label="Movie's id"
                  labelPosition="above"
                  disabled
                />
                <DataTable
                  columns={movieColumns}
                  data={movies.current}
                  options={{
                    paging: true,
                    lengthChange: false,
                    searching: false,
                    ordering: true,
                    info: true,
                    autoWidth: false,
                  }}
                  border
                  onClickEvents={{
                    onChooseEvent: (data, rowIdx, rowData) => {
                      setinputAdd((prev) => ({
                        ...prev,
                        movie_id: data.id,
                      }));
                    },
                  }}
                />
              </div>
              <ButtonGroup>
                <Button
                  name="close-button-add-form"
                  text="Close"
                  onClick={() => {
                    setDataAdd(false);
                  }}
                />
                <Button
                  name="submit-button-add-form"
                  text="Submit"
                  onClick={async () => {
                    await addWishlist(inputAdd);
                    await getWishlists().then((data) => setData(data));
                  }}
                />
              </ButtonGroup>
            </Box>
          ) : (
            ''
          )}
          {/* Update Form */}
          {dataUpdate ? (
            <Box title={'Update Form'} collapsed collapsable>
              <div className={clsx(styles.fixIcon)}>
                <Text
                  name="user-id-update-form"
                  placeholder={dataUpdate.user_id}
                  label="User's id"
                  labelPosition="above"
                  disabled
                />
                <DataTable
                  columns={userColumns}
                  data={users.current}
                  options={{
                    paging: true,
                    lengthChange: false,
                    searching: false,
                    ordering: true,
                    info: true,
                    autoWidth: false,
                  }}
                  border
                  onClickEvents={{
                    onChooseEvent: (data, rowIdx, rowData) => {
                      setDataUpdate((prev) => ({
                        ...prev,
                        user_id: data.id,
                      }));
                    },
                  }}
                />
                <Text
                  name="movie-id-update-form"
                  placeholder={dataUpdate.movie_id}
                  label="Movie's id"
                  labelPosition="above"
                  disabled
                />
                <DataTable
                  columns={movieColumns}
                  data={movies.current}
                  options={{
                    paging: true,
                    lengthChange: false,
                    searching: false,
                    ordering: true,
                    info: true,
                    autoWidth: false,
                  }}
                  border
                  onClickEvents={{
                    onChooseEvent: (data, rowIdx, rowData) => {
                      setDataUpdate((prev) => ({
                        ...prev,
                        movie_id: data.id,
                      }));
                    },
                  }}
                />
              </div>
              <ButtonGroup>
                <Button
                  name="close-button--update-form"
                  text="Close"
                  onClick={() => {
                    setDataUpdate();
                  }}
                />
                <Button
                  name="submit-button-update-form"
                  text="Submit"
                  onClick={async () => {
                    console.log(dataUpdate);
                    await updateWishlist(dataUpdate.id, dataUpdate);
                    await getWishlists().then((data) => setData(data));
                  }}
                />
              </ButtonGroup>
            </Box>
          ) : (
            ''
          )}
          {/* View Form */}
          <Box
            title="Data Table"
            header={
              <Button
                name="add-button-add-form"
                text="Add"
                pullRight
                onClick={() => {
                  setDataAdd(true);
                }}
              />
            }
          >
            <div className={clsx(styles.datatable, styles.fixIcon)}>
              <DataTable
                columns={firstColumns}
                data={data}
                footer
                options={{
                  paging: true,
                  lengthChange: false,
                  searching: false,
                  ordering: true,
                  info: true,
                  autoWidth: false,
                }}
                border
                onClickEvents={{
                  onDeleteEvent: async (data, rowIdx, rowData) => {
                    await deleteWishlist(data.id);
                    await getWishlists().then((data) => setData(data));
                  },
                  onUpdateEvent: (data, rowIdx, rowData) => {
                    setDataUpdate(data);
                  },
                }}
              />
            </div>
          </Box>
        </Col>
      </Row>
    </Content>
  );
};
