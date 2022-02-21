import axios from 'axios';

// All products by category
export const listProductsByCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCT_LIST_REQUEST' });

    const { data } = await axios.get(`/api/products/${category}`);

    dispatch({
      type: 'PRODUCT_LIST_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_LIST_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Fetch single product by id
export const listProductDetails = (category, id) => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCT_DETAILS_REQUEST' });

    const { data } = await axios.get(`/api/products/${category}/${id}`);

    dispatch({
      type: 'PRODUCT_DETAILS_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_DETAILS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get all products - admin
export const listAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCT_LIST_ALL_REQUEST' });

    const { data } = await axios.get(`/api/products/`);

    dispatch({
      type: 'PRODUCT_LIST_ALL_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_LIST_ALL_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
