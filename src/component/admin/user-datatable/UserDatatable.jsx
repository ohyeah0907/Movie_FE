import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import styles from './css/user-datatable.module.scss';
import {
  deleteUser,
  getUsers,
  updateUser,
} from '../../../service/component/user-datatble/UserDatatableService';

const { Text, Radio } = Inputs;
const firstColumns = [
  { title: 'id', data: 'id' },
  { title: 'Name', data: 'name' },
  { title: 'Password', data: 'password' },
  { title: 'RoleId', data: 'roleId' },
];

export const UserDatatable = () => {
  const [data, setData] = useState([]);
  const [dataUpdate, setDataUpdate] = useState();
  const [dataAdd, setDataAdd] = useState(false);
  const inputAdd = useRef({});
  const inputUpdate = useRef({});

  useMemo(() => {
    return (inputUpdate.current = dataUpdate);
  }, [dataUpdate]);

  //Fetch data first time
  useEffect(() => {
    getUsers().then((data) => {
      setData(data);
    });
  }, []);
  return (
    <Content title="User">
      <Row>
        <Col xs={12}>
          {/* Add Form */}
          {dataAdd ? (
            <Box title={'Add Form'} collapsed collapsable>
              <Text
                label="Name"
                labelPosition="above"
                placeholder="Enter name"
                onChange={(event) => {
                  inputAdd.current = {
                    ...inputAdd.current,
                    name: event.currentTarget.value,
                  };
                }}
              />
              <Text
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
                  text="Close"
                  onClick={() => {
                    setDataAdd(false);
                  }}
                />
                <Button
                  text="Submit"
                  onClick={async () => {
                    await fetch(
                      `https://633f9ec4d1fcddf69ca601dd.mockapi.io/api/movie-management/user`,
                      {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(inputAdd.current),
                      }
                    );
                    await getUsers().then((data) => setData(data));
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
              <Text
                name="name"
                placeholder={dataUpdate.name}
                label="Name"
                labelPosition="above"
                onChange={(event) => {
                  if (event.currentTarget.value === '')
                    event.currentTarget.placeholder = 'Enter name';
                  inputUpdate.current = {
                    ...inputUpdate.current,
                    name: event.currentTarget.value.trim(),
                  };
                }}
              />
              <Text
                name="password"
                placeholder={dataUpdate.password}
                label="Password"
                labelPosition="above"
                onChange={(event) => {
                  if (event.currentTarget.value === '')
                    event.currentTarget.placeholder = 'Enter password';
                  inputUpdate.current = {
                    ...inputUpdate.current,
                    password: event.currentTarget.value.trim(),
                  };
                }}
              />
              <Radio
                options={[
                  {
                    id: 'option1',
                    value: '1',
                    label: 'user',
                  },
                  {
                    id: 'option2',
                    value: '2',
                    label: 'admin',
                  },
                ]}
                label="Role"
                labelPosition="above"
                name="role"
                onChange={(event) => {
                  inputUpdate.current = {
                    ...inputUpdate.current,
                    roleId: event.currentTarget.value,
                  };
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
                    await updateUser(
                      inputUpdate.current.id,
                      inputUpdate.current
                    );
                    await getUsers().then((data) => setData(data));
                  }}
                />
              </ButtonGroup>
            </Box>
          ) : (
            ''
          )}
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
            <div className={clsx(styles.datatable)}>
              <DataTable
                columns={firstColumns.concat([
                  {
                    title: 'Actions',
                    data: null,
                    render: () => (
                      <>
                        <Button
                          text="Delete"
                          className="on-delete-event"
                          margin
                        />
                        <Button
                          text="Update"
                          className="on-update-event"
                          margin
                        ></Button>
                      </>
                    ),
                  },
                ])}
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
                    await deleteUser(data.id);
                    await getUsers().then((data) => setData(data));
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
