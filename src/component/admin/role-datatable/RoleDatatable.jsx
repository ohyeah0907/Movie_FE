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
import styles from './css/role-datatable.module.css';
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
export const RoleDatatable = () => {
  const [data, setData] = useState([]);
  const [dataUpdate, setDataUpdate] = useState();
  const [dataAdd, setDataAdd] = useState(false);
  const inputAdd = useRef({});

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
              <ButtonGroup>
                <Button
                  name="close-button-add-form"
                  text="Close"
                  onClick={() => {
                    setDataAdd(false);
                  }}
                />
                <Button
                  name="close-button-add-form"
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
                    await updateRole(dataUpdate.id, dataUpdate);
                    await getRoles().then((data) => setData(data));
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
