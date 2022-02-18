import React, { useEffect } from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import SideNav from '../components/SideNav';
import { getOrdersByUser } from '../actions/orderActions';
import OrderItem from '../components/OrderItem';

const OrderPage = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const orderList = useSelector((state) => state.ordersByUser);
  const { order, loading } = orderList;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(getOrdersByUser('myorder'));
    }
  }, [userInfo, history, dispatch]);

  return (
    <Row>
      <Col md={3}>
        <SideNav />
      </Col>
      <Col md={8}>
        <>
          <div className='canvas'>
            <div className='canvas-header'>
              <h5>Order History & Tracking</h5>
            </div>
            <div className='canvas-body'>
              {loading ? (
                <Loader />
              ) : !order || order.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Link to={`/order/${item._id}`}>
                        <OrderItem order={item} />
                      </Link>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </div>
          </div>
        </>
      </Col>
    </Row>
  );
};

export default OrderPage;
