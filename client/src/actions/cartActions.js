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
  ({ user, name, qty, image, price, category, product }) =>
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
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.put(
        `/api/carts/`,
        { user, name, qty, image, price, category, product },
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
