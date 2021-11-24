import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';

import { getUserDetails, updateUserProfile } from '../actions/userActions';

const ChangePofile = ({ location, history }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNum, setContactNum] = useState('');
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState('');

  const redirect = useHistory();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (success) {
        dispatch({ type: 'USER_UPDATE_PROFILE_RESET' });
        dispatch({ type: 'USER_UPDATE_PROFILE_DONE' });
        dispatch(getUserDetails('profile'));
        redirect.push('/account');
      }

      if (!user || !user.email) {
        dispatch(getUserDetails('profile'));
      }
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setContactNum(user.contactNum || '');
      setEmail(user.email);
    }
  }, [dispatch, history, userInfo, user, success, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (firstName && lastName && email) {
      dispatch(
        updateUserProfile({
          id: user._id,
          firstName,
          lastName,
          contactNum,
          email,
        })
      );
    } else {
      setAlert('Fill up all fields');
    }
  };

  return (
    <>
      {alert && <Message variant='danger'>{alert}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='firstName'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter first name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='lastName'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter last name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='contactNum'>
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter contact number'
            value={contactNum}
            onChange={(e) => setContactNum(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <div className='btn-group'>
          <Button type='submit' variant='primary'>
            Update Profile
          </Button>
          <Link className='btn btn-light btn-light-link' to={`/account`}>
            Cancel
          </Link>
        </div>
      </Form>
    </>
  );
};

export default ChangePofile;
