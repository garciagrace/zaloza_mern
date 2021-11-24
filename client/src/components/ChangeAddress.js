import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';

import { getUserDetails, updateUserProfile } from '../actions/userActions';

const ChangeAddress = ({ location, history }) => {
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [barangay, setBarangay] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
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
        dispatch({ type: 'USER_UPDATE_PROFILE_DONE' });
        dispatch(getUserDetails('profile'));
        redirect.push('/account');
      }

      if (!user || !user.email) {
        dispatch(getUserDetails('profile'));
      }

      if (user.isAddressSet) {
        setHouseNo(user.address.houseNo);
        setStreet(user.address.street);
        setBarangay(user.address.barangay);
        setCity(user.address.city);
        setProvince(user.address.province);
        setPostalCode(user.address.postalCode);
      }
    }
  }, [dispatch, history, userInfo, user, success, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (houseNo && street && barangay && city && province && postalCode) {
      const setAddress = {
        houseNo,
        street,
        barangay,
        city,
        province,
        postalCode,
      };
      dispatch(
        updateUserProfile({
          id: user._id,
          isAddressSet: true,
          houseNo,
          street,
          barangay,
          city,
          province,
          postalCode,
        })
      );
      console.log(setAddress);
    } else {
      setAlert('Fill up all fields');
    }
  };

  return (
    <>
      {alert && <Message variant='danger'>{alert}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='houseNo'>
          <Form.Label>House No</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter house no'
            value={houseNo}
            onChange={(e) => setHouseNo(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='street'>
          <Form.Label>Street</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter street'
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='barangay'>
          <Form.Label>Barangay</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter barangay'
            value={barangay}
            onChange={(e) => setBarangay(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='province'>
          <Form.Label>Province</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter province'
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter postal code'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <div className='btn-group'>
          <Button type='submit' variant='primary'>
            Update Address
          </Button>
          <Link className='btn btn-light btn-light-link' to={`/account`}>
            Cancel
          </Link>
        </div>
      </Form>
    </>
  );
};

export default ChangeAddress;
