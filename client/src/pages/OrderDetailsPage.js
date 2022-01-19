import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails } from '../actions/orderActions';
import { numberWithCommas } from '../utilities';

const OrderDetailsPage = ({ match, history }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [userInfo, history, dispatch, orderId, order]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Link className='btn btn-light my-3' to={'/order'}>
        Go Back
      </Link>

      <div className='canvas'>
        <div className='canvas-header'>
          <h3>Order# {order._id}</h3>
        </div>
        <div className='canvas-body'>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h4>Shipping</h4>
                  <p>
                    <strong>Name: </strong>{' '}
                    {`${order.user.firstName} ${order.user.lastName}`}
                  </p>
                  <p>
                    <strong>Email: </strong>{' '}
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.houseNo},{' '}
                    {order.shippingAddress.street},{' '}
                    {order.shippingAddress.barangay},{' '}
                    {order.shippingAddress.city},{' '}
                    {order.shippingAddress.province}{' '}
                    {order.shippingAddress.postalCode}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h4>Payment Method</h4>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h4>Order Items</h4>
                  {order.orderItems.length === 0 ? (
                    <Message>Order is empty</Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>{item.name}</Col>
                            <Col md={4}>
                              {item.qty} x P{item.price} = P
                              {numberWithCommas(Number(item.qty * item.price))}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h4>Order Summary</h4>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status</Col>
                      <Col className='d-flex justify-content-end'>
                        {order.orderStatus}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col className='d-flex justify-content-end'>
                        P {numberWithCommas(Number(order.itemPrice))}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col className='d-flex justify-content-end'>
                        P {numberWithCommas(Number(order.shippingPrice))}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col className='d-flex justify-content-end'>
                        P {numberWithCommas(Number(order.totalPrice))}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsPage;
