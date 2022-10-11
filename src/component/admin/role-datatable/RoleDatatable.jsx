import React, { useEffect, useState, useRef, useMemo } from 'react';
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
import styles from './css/role-datatable.module.scss';
import {
  addRole,
  deleteRole,
  getRoles,
  updateRole,
} from '../../../service/component/role-datatable/RoleDatableService';
const { Text } = Inputs;
const firstColumns = [
  { title: 'id', data: 'id' },
  { title: 'Name', data: 'name' },
];
export const RoleDatatable = () => {
  const [data, setData] = useState([]);
  const [dataUpdate, setDataUpdate] = useState();
  const [dataAdd, setDataAdd] = useState(false);
  const inputUpdate = useRef({});
  const inputAdd = useRef({});

  useMemo(() => {
    return (inputUpdate.current = dataUpdate);
  }, [dataUpdate]);

  useEffect(() => {
    getRoles().then((data) => setData(data));
  }, []);
  return (
    <Content title="Role">
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
                    await addRole(inputAdd.current);
                    await getRoles().then((data) => setData(data));
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
                placeholder={inputUpdate.current.name}
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
                    await updateRole(
                      inputUpdate.current.id,
                      inputUpdate.current
                    );
                    await getRoles().then((data) => setData(data));
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
                    await deleteRole(data.id);
                    await getRoles().then((data) => setData(data));
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
