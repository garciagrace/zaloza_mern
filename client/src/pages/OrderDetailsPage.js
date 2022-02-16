import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getOrderDetails,
  updateOrderStatus,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '../actions/orderActions';
import { numberWithCommas } from '../utilities';

const OrderDetailsPage = ({ match, history }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver } = orderDeliver;

  const orderStatus = useSelector((state) => state.orderStatus);
  const { success: successStatus } = orderStatus;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    if (
      !order ||
      order._id !== orderId ||
      successPay ||
      successDeliver ||
      successStatus
    ) {
      dispatch({ type: 'ORDER_PAY_RESET' });
      dispatch({ type: 'ORDER_DELIVER_RESET' });
      dispatch({ type: 'ORDER_STATUS_RESET' });
      dispatch(getOrderDetails(orderId));
    }
  }, [
    userInfo,
    history,
    dispatch,
    orderId,
    order,
    successPay,
    successDeliver,
    successStatus,
  ]);

  const paymentHandler = () => {
    dispatch(updateOrderToPaid(orderId, userInfo.token));
  };

  const deliveryHandler = () => {
    dispatch(updateOrderToDelivered(orderId, userInfo.token));
  };

  const orderStatusHandler = () => {
    dispatch(updateOrderStatus(orderId, userInfo.token));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      {user.isAdmin ? (
        <Link className='btn btn-light my-3' to={'/admin/order'}>
          Go Back
        </Link>
      ) : (
        <Link className='btn btn-light my-3' to={'/orders'}>
          Go Back
        </Link>
      )}

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
                  <Row>
                    <Col>
                      <p>
                        <span className='fw-900'>Name: </span>{' '}
                        {`${order.user.firstName} ${order.user.lastName}`}
                      </p>
                      <p>
                        <span className='fw-900'>Email: </span>{' '}
                        <a href={`mailto:${order.user.email}`}>
                          {order.user.email}
                        </a>
                      </p>
                      <p>
                        <span className='fw-900'>Address: </span>
                        {order.shippingAddress.houseNo},{' '}
                        {order.shippingAddress.street},{' '}
                        {order.shippingAddress.barangay},{' '}
                        {order.shippingAddress.city},{' '}
                        {order.shippingAddress.province}{' '}
                        {order.shippingAddress.postalCode}
                      </p>
                    </Col>
                    <Col>
                      <p>
                        <span className='fw-900'>Status: </span>{' '}
                        {order.isDelivered ? 'Delivered' : 'Not yet delivered'}
                      </p>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h4>Payment Method</h4>
                  <Row>
                    <Col>
                      <p>
                        <span className='fw-900'>Method: </span>
                        {order.paymentMethod}
                      </p>
                    </Col>
                    <Col>
                      <p>
                        <span className='fw-900'>Status: </span>{' '}
                        {order.isPaid ? 'Paid' : 'Not yet paid'}
                      </p>
                    </Col>
                  </Row>
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
                  {user.isAdmin && !order.isPaid && (
                    <ListGroup.Item>
                      <Row className='p-2'>
                        <Button
                          type='button'
                          variant='success'
                          className='btn btn-block'
                          onClick={paymentHandler}
                        >
                          Mark As Paid
                        </Button>
                      </Row>
                    </ListGroup.Item>
                  )}
                  {user.isAdmin && !order.isDelivered && (
                    <ListGroup.Item>
                      <Row className='p-2'>
                        <Button
                          type='button'
                          variant='warning'
                          className='btn btn-block'
                          onClick={deliveryHandler}
                        >
                          Mark As Delivered
                        </Button>
                      </Row>
                    </ListGroup.Item>
                  )}
                  {user.isAdmin && order.orderStatus === 'Processing' && (
                    <ListGroup.Item>
                      <Row className='p-2'>
                        <Button
                          type='button'
                          variant='primary'
                          className='btn btn-block'
                          onClick={orderStatusHandler}
                        >
                          Mark as Out for Delivery
                        </Button>
                      </Row>
                    </ListGroup.Item>
                  )}
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
