import React from 'react';
import { Col, Row } from 'react-bootstrap';

import MenuItem from '../components/MenuItem';

const HomePage = () => {
  const category = ['Women', 'Men', 'Kids', 'Beauty', 'Home', 'Gadgets'];
  return (
    <>
      <Row>
        {category.map((item, index) => (
          <Col key={index + 1} sm={12} md={6} lg={4}>
            <MenuItem item={item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
