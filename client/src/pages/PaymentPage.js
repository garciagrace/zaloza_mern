import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Form, Button } from 'react-bootstrap';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';

import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';

import { savePaymentDetails } from '../actions/cartActions';

const PaymentPage = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cartList);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!window.paypal) {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
  }, [history, userInfo, dispatch, paymentMethod]);

  // IF Payment is COD
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentDetails(paymentMethod));
    history.push('/placeorder');
  };

  // If payment is through PayPal
  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);

    if (paymentResult) {
      dispatch(
        savePaymentDetails({
          paymentMethod,
          paymentStatus: paymentResult.status === 'COMPLETED' ? true : false,
          paymentResults: {
            id: paymentResult.id,
            status: paymentResult.status,
            update_time: paymentResult.update_time,
          },
        })
      );
      history.push('/placeorder');
    }
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
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    paymentMethod === 'PayPal' && (
                      <PayPalButton
                        amount={
                          Number(
                            cartItems.reduce(
                              (acc, item) => acc + item.qty * item.price,
                              0
                            )
                          ) + 100
                        }
                        onSuccess={successPaymentHandler}
                      />
                    )
                  )}
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

              {paymentMethod === 'COD' && (
                <Button type='submit' variant='primary'>
                  Continue
                </Button>
              )}
            </Form>
          </FormContainer>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
