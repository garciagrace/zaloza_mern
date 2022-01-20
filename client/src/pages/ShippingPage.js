import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';

import { getUserDetails } from '../actions/userActions';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';

const ShippingPage = ({ history }) => {
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [barangay, setBarangay] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [alert, setAlert] = useState('');

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

      if (user.isAddressSet) {
        setHouseNo(user.address.houseNo);
        setStreet(user.address.street);
        setBarangay(user.address.barangay);
        setCity(user.address.city);
        setProvince(user.address.province);
        setPostalCode(user.address.postalCode);
      }
    }
  }, [dispatch, history, userInfo, user, alert]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      houseNo === '' &&
      street === '' &&
      barangay === '' &&
      city === '' &&
      province === '' &&
      postalCode === ''
    ) {
      setAlert('Fill up all fields');
    } else {
      dispatch(
        saveShippingAddress({
          houseNo,
          street,
          barangay,
          city,
          province,
          postalCode,
        })
      );

      history.push('/payment');
    }
  };

  return (
    <>
      <CheckoutSteps step1 />
      <div className='canvas'>
        <div className='canvas-header'>
          <h5>Shipping Address</h5>
        </div>

        <div className='canvas-body'>
          {alert && <Message variant='danger'>{alert}</Message>}
          <FormContainer>
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
              <Button type='submit' variant='primary'>
                Continue
              </Button>
            </Form>
          </FormContainer>
        </div>
      </div>
    </>
  );
};

export default ShippingPage;
