import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import SideNav from '../components/SideNav';
import { getUserDetails } from '../actions/userActions';

const ProfilePage = ({ location, history }) => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(getUserDetails('profile'));
    }
  }, [history, userInfo, dispatch]);

  return (
    <Row>
      <Col md={3}>
        <SideNav />
      </Col>
      <Col md={8}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <div className='canvas'>
              <div className='canvas-header'>
                <h5>My Account</h5>
              </div>
              <div className='canvas-body'>
                <Row>
                  <Col md={9}>
                    <p className='canvas-label'>
                      <span>Name:</span> {`${user.firstName} ${user.lastName}`}
                    </p>
                    <p className='canvas-label'>
                      <span>Contact Number:</span> {user.contactNum || '-'}
                    </p>
                    <p className='canvas-label'>
                      <span>Email Address:</span> {user.email}
                    </p>
                    <p className='canvas-label'>
                      <span>Password:</span> ******
                    </p>
                  </Col>
                </Row>
              </div>
            </div>

            <div className='canvas'>
              <div className='canvas-header'>
                <h5>Billing/Shipping Address</h5>
              </div>
              <div className='canvas-body'></div>
            </div>
          </>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
