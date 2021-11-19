import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';

import { getUserDetails, updateUserProfile } from '../actions/userActions';

const ChangePassword = ({ history }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState('');

  const redirect = useHistory();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

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
    if (newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        setAlert('Passwords do not match');
      } else if (newPassword.length < 6) {
        setAlert('Password needs to be 6 characters or more');
      } else {
        dispatch(
          updateUserProfile({ id: user._id, password: confirmPassword })
        );
        redirect.push('/account');
      }
    } else {
      setAlert('Fill up all fields');
    }
  };

  return (
    <>
      {alert && <Message variant='danger'>{alert}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='newPassword'>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter new password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter new password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <div className='btn-group'>
          <Button type='submit' variant='primary'>
            Change Password
          </Button>
          <Link className='btn btn-light btn-light-link' to={`/account`}>
            Cancel
          </Link>
        </div>
      </Form>
    </>
  );
};

export default ChangePassword;
