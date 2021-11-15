import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import SideNav from '../components/SideNav';

import { getUserDetails } from '../actions/userActions';
import ChangePassword from '../components/ChangePassword';
import ChangePofile from '../components/ChangeProfile';
import ChangeAddress from '../components/ChangeAddress';

const UpdateProfilePage = ({ history, match }) => {
  const toUpdate = match.params.params;
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.email) {
        dispatch(getUserDetails('profile'));
      }
    }
  }, [dispatch, history, userInfo, user]);

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
                <h5>Update Profile</h5>
              </div>
              <div className='canvas-body'>
                <Row>
                  <Col md={9}>
                    {toUpdate === 'update-info' ? (
                      <ChangePofile />
                    ) : toUpdate === 'change-password' ? (
                      <ChangePassword />
                    ) : (
                      <ChangeAddress />
                    )}
                  </Col>
                </Row>
              </div>
            </div>
          </>
        )}
      </Col>
    </Row>
  );
};

export default UpdateProfilePage;
