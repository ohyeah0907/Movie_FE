import React from 'react';
import { Content, Box, Row, Col } from 'adminlte-2-react';

export const MovieDatatable = () => {
  return (
    <Content title="Movie" browserTitle="Movie" homeRoute={'/movie'}>
      <Row>
        <Col xs={6}>
          <Box title="My first box" type="primary">
            Hello World
          </Box>
        </Col>
        <Col xs={6}>
          <Box title="Another box">Content goes here</Box>
        </Col>
      </Row>
    </Content>
  );
};
