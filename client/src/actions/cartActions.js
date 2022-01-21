import axios from 'axios';

// Get cart list
export const getCartList = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'CART_LIST_REQUEST',
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/carts/${id}`, config);

    dispatch({
      type: 'CART_LIST_SUCCESS',
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: 'CART_LIST_FAIL',
      payload: message,
    });
  }
};

// Add item on cart
export const addCartItem =
  ({ user, name, size, qty, image, price, category, product }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: 'CART_ADD_ITEM_REQUEST',
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

      const { data } = await axios.put(
        `/api/carts/`,
        { user, name, size, qty, image, price, category, product },
        config
      );

      dispatch({
        type: 'CART_ADD_ITEM_SUCCESS',
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: 'CART_ADD_ITEM_FAIL',
        payload: message,
      });
    }
  };

/// Remove item from cart
export const removeCartItem =
  ({ user, cartID }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: 'CART_REMOVE_ITEM_REQUEST',
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

      const { data } = await axios.put(
        `/api/carts/mycart`,
        { user, cartID },
        config
      );

      dispatch({
        type: 'CART_REMOVE_ITEM_SUCCESS',
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: 'CART_REMOVE_ITEM_FAIL',
        payload: message,
      });
    }
  };

// Save shipping address on local storage
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: 'CART_SAVE_SHIPPING_ADDRESS',
    payload: data,
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

// Save payment method on local storage
export const savePaymentDetails = (data) => (dispatch) => {
  dispatch({
    type: 'CART_SAVE_PAYMENT_DETAILS',
    payload: data,
  });

  localStorage.setItem('paymentDetails', JSON.stringify(data));
};

// Clear cart
export const clearCart =
  ({ user }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: 'CART_CLEAR_REQUEST',
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

      const { data } = await axios.put(
        `/api/carts/clearcart`,
        { user },
        config
      );

      dispatch({
        type: 'CART_CLEAR_SUCCESS',
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: 'CART_CLEAR_FAIL',
        payload: message,
      });
    }
  };
