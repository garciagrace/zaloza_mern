import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';

import { getCartList, removeCartItem } from '../actions/cartActions';
import { getUserDetails } from '../actions/userActions';

import { numberWithCommas } from '../utilities';

const CartPage = ({ location, history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const cart = useSelector((state) => state.cartList);
  const { cartItems, loading } = cart;

  const removed = useSelector((state) => state.cartRemoveItem);
  const { success } = removed;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (success) {
        dispatch({ type: 'CART_REMOVE_ITEM_DONE' });
      }

      dispatch(getUserDetails('profile'));
      dispatch(getCartList('mycart'));
    }
  }, [dispatch, history, userInfo, success]);

  const removeFromCartHandler = (id) => {
    dispatch(removeCartItem({ user: user._id, cartID: id }));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {loading ? (
          <Loader />
        ) : cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={5}>
                    <Link to={`/products/${item.category}/${item.product}`}>
                      {item.name}
                    </Link>
                    <p>{`Size: ${item.size}`}</p>
                  </Col>
                  <Col md={2}>P{numberWithCommas(item.price)}</Col>
                  <Col md={2}>
                    <p>{`Qty: ${item.qty}`}</p>
                  </Col>
                  <Col md={1}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              P
              {numberWithCommas(
                cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
