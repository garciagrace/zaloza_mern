import axios from 'axios';

// Create order
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'ORDER_CREATE_REQUEST',
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({
      type: 'ORDER_CREATE_SUCCESS',
      payload: data,
    });

    localStorage.removeItem('paymentDetails');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('__paypal_storage__');
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: 'ORDER_CREATE_FAIL',
      payload: message,
    });
  }
};

// Get order details by id
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'ORDER_DETAILS_REQUEST',
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: 'ORDER_DETAILS_SUCCESS',
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: 'ORDER_DETAILS_FAIL',
      payload: message,
    });
  }
};

// Get order by specific user
export const getOrdersByUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'ORDER_LIST_REQUEST',
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: 'ORDER_LIST_SUCCESS',
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: 'ORDER_LIST_FAIL',
      payload: message,
    });
  }
};
