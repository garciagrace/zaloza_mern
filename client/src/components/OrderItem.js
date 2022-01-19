import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { numberWithCommas } from '../utilities';

const OrderItem = ({ order }) => {
  return (
    <Row>
      <Col md={8}>
        <p className='fw-900'>Order# {order._id}</p>
        <p>Number of item(s): {order.orderItems.length}</p>
        <p>Total Price: P{numberWithCommas(order.totalPrice)}</p>
      </Col>
      <Col md={4}>{order.orderStatus}</Col>
    </Row>
  );
};

export default OrderItem;
