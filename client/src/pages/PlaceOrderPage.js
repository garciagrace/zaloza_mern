import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';

import { numberWithCommas } from '../utilities';
import { createOrder } from '../actions/orderActions';
import { clearCart } from '../actions/cartActions';

const PlaceOrderPage = ({ history }) => {
  const dispatch = useDispatch();
  const [itemPrice, setItemPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const cart = useSelector((state) => state.cartList);
  const { cartItems } = cart;

  const shipping = useSelector((state) => state.cart);
  const { shippingAddress } = shipping;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success } = orderCreate;

  const paymentDetails = JSON.parse(localStorage.getItem('paymentDetails'));

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: 'ORDER_CREATE_RESET' });
    }

    if (cartItems.length !== 0) {
      setItemPrice(
        cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
      );

      setTotalPrice(
        Number(
          cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
        ) + 100
      );
    }
    // eslint-disable-next-line
  }, [history, success, cartItems, paymentDetails]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        itemPrice,
        shippingAddress: shippingAddress,
        shippingPrice: 100,
        totalPrice,
        paymentMethod: paymentDetails.paymentMethod,
        isPaid: paymentDetails.paymentStatus,
        paidAt: paymentDetails.paymentResults.update_time,
        paymentResult: paymentDetails.paymentResults,
      })
    );
    dispatch(clearCart({ user: user._id }));
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <span className='fw-900'>Address:</span>{' '}
                {shippingAddress.houseNo}, {shippingAddress.street},{' '}
                {shippingAddress.barangay}, {shippingAddress.city},{' '}
                {shippingAddress.province} {shippingAddress.postalCode}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <Row>
                <Col>
                  <p>
                    <span className='fw-900'>Method: </span>
                    {paymentDetails.paymentMethod}
                  </p>
                </Col>
                <Col>
                  <p>
                    <span className='fw-900'>Status: </span>
                    {paymentDetails.paymentStatus ? 'Paid' : 'Not yet Paid'}
                  </p>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cartItems.map((item, index) => (
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
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x P{item.price} = P{item.qty * item.price}
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
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col className='d-flex justify-content-end'>
                    P {numberWithCommas(itemPrice)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col className='d-flex justify-content-end'>P 100.00</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className='fw-900'>
                  <Col>Total</Col>
                  <Col className='d-flex justify-content-end'>
                    P {numberWithCommas(Number(totalPrice))}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
