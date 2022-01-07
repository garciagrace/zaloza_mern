import React, { useState } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';

import { savePaymentMethod } from '../actions/cartActions';

const PaymentPage = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <>
      <CheckoutSteps step1 step2 />
      <div className='canvas'>
        <div className='canvas-header'>
          <h5>Payment Method</h5>
        </div>

        <div className='canvas-body'>
          <FormContainer>
            <Form onSubmit={submitHandler}>
              <Form.Group>
                <Col>
                  <Form.Check
                    type='radio'
                    label='PayPal or Credit Card'
                    id='PayPal'
                    name='paymentMethod'
                    value='PayPal'
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                  <Form.Check
                    type='radio'
                    label='Cash on Delivery'
                    id='COD'
                    name='paymentMethod'
                    value='COD'
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                </Col>
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

export default PaymentPage;
