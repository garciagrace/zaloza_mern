import React, { useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
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
      if (!user || !user.email) {
        dispatch(getUserDetails('profile'));
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    history.push(`/account/update-profile/${e.target.value}`);
  };

  return (
    <Row>
      <Col md={3}>
        <SideNav isAdmin={user.isAdmin} />
      </Col>

      <Col md={9}>
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
                  <Col md={10}>
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
                    <Button
                      className='btn-light btn-light-sm'
                      value={'change-password'}
                      onClick={(e) => submitHandler(e)}
                    >
                      Change Password
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button
                      className='btn-light btn-light-sm'
                      value={'update-info'}
                      onClick={(e) => submitHandler(e)}
                    >
                      Edit Profile
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>

            <div className='canvas'>
              <div className='canvas-header'>
                <h5>Billing/Shipping Address</h5>
              </div>
              <div className='canvas-body'>
                <Row>
                  <Col md={5}>
                    {user.isAddressSet ? (
                      <>
                        <div className='address-grp'>
                          <h6>Complete Address</h6>
                          <p>{`${user.address.houseNo} ${user.address.street},`}</p>
                          <p>{`${user.address.barangay}, ${user.address.city},`}</p>
                          <p>{`${user.address.province} ${user.address.postalCode}`}</p>
                        </div>

                        <Button
                          className='btn-add'
                          value={'update-address'}
                          onClick={(e) => submitHandler(e)}
                        >
                          Update Address
                        </Button>
                      </>
                    ) : (
                      <Button
                        className='btn-add'
                        value={'add-address'}
                        onClick={(e) => submitHandler(e)}
                      >
                        Add Address
                      </Button>
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

export default ProfilePage;
