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
