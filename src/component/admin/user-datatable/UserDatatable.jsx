import React, { useEffect, useRef, useState } from 'react';
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
import styles from './css/user-datatable.module.css';
import {
  addUser,
  deleteUser,
  getUsers,
} from '../../../service/component/user-datatble/UserDatatableService';

const { Text, Radio } = Inputs;
const firstColumns = [
  { title: 'id', data: 'id' },
  { title: 'Name', data: 'username' },
  { title: 'Password', data: 'password' },
  {
    title: 'Actions',
    data: null,
    render: () => (
      <>
        <Button text="Delete" className="on-delete-event" margin />
      </>
    ),
  },
];

export const UserDatatable = () => {
  const [data, setData] = useState([]);
  const [enableAdd, setEnableAdd] = useState(false);
  const controller = new AbortController();
  const inputAdd = useRef({});

  //Fetch data first time and fetch foreign key first time
  useEffect(() => {
    getUsers(controller.signal).then((res) => {
      setData(res.data);
    });
    return () => controller.abort();
  }, []);

  return (
    <Content title="User">
      <Row>
        <Col xs={12}>
          {/* Add Form */}
          {enableAdd && (
            <Box title={'Add Form'} collapsed collapsable>
              <Text
                name="name-add-form"
                label="Name"
                labelPosition="above"
                placeholder="Enter name"
                onChange={(event) => {
                  inputAdd.current = {
                    ...inputAdd.current,
                    username: event.currentTarget.value,
                  };
                }}
              />
              <Text
                name="password-add-form"
                label="Password"
                labelPosition="above"
                placeholder="Enter password"
                onChange={(event) => {
                  inputAdd.current = {
                    ...inputAdd.current,
                    password: event.currentTarget.value,
                  };
                }}
              />
              <ButtonGroup>
                <Button
                  name="close-button-add-form"
                  text="Close"
                  onClick={() => {
                    setEnableAdd(false);
                    inputAdd.current = {};
                  }}
                />
                <Button
                  name="submit-button-add-form"
                  text="Submit"
                  onClick={async () => {
                    await addUser(inputAdd.current, controller.signal);
                    await getUsers(controller.signal).then((res) => {
                      setData(res.data);
                    });
                  }}
                />
              </ButtonGroup>
            </Box>
          )}
          {/* View Form */}
          <Box
            title="Data Table"
            header={
              <Button
                name="add-button-view-form"
                text="Add"
                pullRight
                onClick={() => {
                  setEnableAdd(true);
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
                    await deleteUser(data.id, controller.signal);
                    await getUsers(controller.signal).then((res) =>
                      setData(res.data)
                    );
                  },
                  // onUpdateEvent: (data, rowIdx, rowData) => {
                  //   setDataUpdate(data);
                  // },
                }}
              />
            </div>
          </Box>
        </Col>
      </Row>
    </Content>
  );
};
