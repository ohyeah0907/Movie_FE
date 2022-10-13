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
  updateUser,
} from '../../../service/component/user-datatble/UserDatatableService';
import { getRoles } from '../../../service/component/role-datatable/RoleDatableService';

const { Text, Radio } = Inputs;
const firstColumns = [
  { title: 'id', data: 'id' },
  { title: 'Name', data: 'name' },
  { title: 'Password', data: 'password' },
  { title: 'RoleId', data: 'roleId' },
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

export const UserDatatable = () => {
  const [data, setData] = useState([]);
  const [dataUpdate, setDataUpdate] = useState();
  const [dataAdd, setDataAdd] = useState(false);

  const inputAdd = useRef({});
  //Foreign key in table
  const roles = useRef({});

  //Fetch data first time and fetch foreign key first time
  useEffect(() => {
    getDataFirstTime();
  }, []);

  const getDataFirstTime = async () => {
    await getRoles().then((data) => {
      roles.current = data;
    });
    await getUsers().then((data) => {
      setData(data);
    });
  };

  return (
    <Content title="User">
      <Row>
        <Col xs={12}>
          {/* Add Form */}
          {dataAdd ? (
            <Box title={'Add Form'} collapsed collapsable>
              <Text
                name="name-add-form"
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
              <Radio
                options={
                  roles
                    ? roles.current.map((data, key) => ({
                        id: `role-option-add-form-${key}`,
                        value: `${data.id}`,
                        label: `${data.name}`,
                      }))
                    : ''
                }
                label="Role"
                labelPosition="above"
                name="role-add-form"
                onChange={(event) => {
                  inputAdd.current = {
                    ...inputAdd.current,
                    roleId: event.currentTarget.value,
                  };
                }}
              />
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
                    await addUser(inputAdd.current);
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
                name="name-update-form"
                placeholder="Enter name"
                label="Name"
                value={dataUpdate.name}
                labelPosition="above"
                onChange={(event) => {
                  setDataUpdate((prev) => ({
                    ...prev,
                    name: event.target.value,
                  }));
                }}
              />
              <Text
                name="password-update-form"
                placeholder="Enter password"
                label="Password"
                value={dataUpdate.password}
                labelPosition="above"
                onChange={(event) => {
                  setDataUpdate((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }));
                }}
              />
              <Radio
                options={
                  roles
                    ? roles.current.map((data, key) => ({
                        id: `role-option-update-form-${key}`,
                        value: `${data.id}`,
                        label: `${data.name}`,
                        checked: dataUpdate.roleId === data.id ? true : false,
                      }))
                    : ''
                }
                label="Role"
                labelPosition="above"
                name="role-update-form"
                onChange={(event) => {
                  setDataUpdate((prev) => ({
                    ...prev,
                    roleId: event.target.value,
                  }));
                }}
              />
              <ButtonGroup>
                <Button
                  name="close-button-update-form"
                  text="Close"
                  onClick={() => {
                    setDataUpdate();
                  }}
                />
                <Button
                  name="submit-button-update-form"
                  text="Submit"
                  onClick={async () => {
                    await updateUser(dataUpdate.id, dataUpdate);
                    await getUsers().then((data) => setData(data));
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
                name="add-button-view-form"
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
