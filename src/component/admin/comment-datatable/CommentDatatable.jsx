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
  Label,
} from 'adminlte-2-react';
import clsx from 'clsx';
import styles from './css/comment-datatable.module.css';
import {
  addComment,
  deleteComment,
  getComments,
  updateComment,
} from '../../../service/component/comment-datatable/CommentDatatableService';
import { getMovies } from '../../../service/component/movie-datatable/MovieDatatableService';
import { getUsers } from '../../../service/component/user-datatble/UserDatatableService';
import DateTimePicker from 'react-datetime-picker';

const { Text } = Inputs;
const firstColumns = [
  { title: 'id', data: 'id' },
  { title: "User's id", data: 'user_id' },
  { title: "Movie's id", data: 'movie_id' },
  { title: 'Date', data: 'date' },
  { title: 'Content', data: 'content', width: '200px' },
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

export const CommentDatatable = () => {
  const [data, setData] = useState([]);
  const [dataUpdate, setDataUpdate] = useState();
  const [dataAdd, setDataAdd] = useState(false);
  const [inputAdd, setinputAdd] = useState({
    date: new Date(),
  });

  //Foreign key in table
  const users = useRef({});
  const movies = useRef({});

  useEffect(() => {
    getDataFirstTime();
  }, []);

  const getDataFirstTime = async () => {
    await getUsers().then((data) => {
      users.current = data;
    });
    await getMovies().then((data) => {
      movies.current = data;
    });
    await getComments().then((data) => {
      setData(data);
    });
  };
  return (
    <Content title={'Comment'}>
      <Row>
        <Col xs={12}>
          {/* Add Form */}
          {dataAdd ? (
            <Box title={'Add Form'} collapsed collapsable>
              <div className={clsx(styles.fixIcon)}>
                <Text
                  name="userId"
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
                  name="movieId"
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
              <Label type="info" children={'Date'} />
              <DateTimePicker
                onChange={(value) => {
                  setinputAdd((prev) => ({
                    ...prev,
                    date: value,
                  }));
                }}
                format="dd/MM/y"
                disableClock
                value={inputAdd.date}
                className={styles.datetimePicker}
              />

              <Text
                label="Content"
                name="content"
                type="textarea"
                labelPosition="above"
                onChange={(event) => {
                  setinputAdd((prev) => ({
                    ...prev,
                    content: event.target.value,
                  }));
                }}
              />
              <ButtonGroup>
                <Button
                  text="Close"
                  onClick={() => {
                    setDataAdd(false);
                  }}
                />
                <Button
                  text="Submit"
                  onClick={async () => {
                    await addComment(inputAdd);
                    await getComments().then((data) => setData(data));
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
                  name="userId"
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
                  name="movieId"
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
              <Label type="info" children={'Date'} />
              <DateTimePicker
                onChange={(value) => {
                  setDataUpdate((prev) => ({
                    ...prev,
                    date: value,
                  }));
                }}
                format="dd/MM/y"
                disableClock
                value={new Date(dataUpdate.date)}
                className={styles.datetimePicker}
              />

              <Text
                label="Content"
                name="content"
                type="textarea"
                labelPosition="above"
                onChange={(event) => {
                  setDataUpdate((prev) => ({
                    ...prev,
                    content: event.target.value,
                  }));
                }}
              />
              <ButtonGroup>
                <Button
                  text="Close"
                  onClick={() => {
                    setDataUpdate();
                  }}
                />
                <Button
                  text="Submit"
                  onClick={async () => {
                    await updateComment(dataUpdate.id, dataUpdate);
                    await getComments().then((data) => setData(data));
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
                    await deleteComment(data.id);
                    await getComments().then((data) => setData(data));
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
