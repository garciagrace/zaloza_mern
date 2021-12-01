// Cart list
export const cartListReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case 'CART_LIST_REQUEST':
      return { ...state, loading: true };
    case 'CART_LIST_SUCCESS':
      return { loading: false, cartItems: action.payload };
    case 'CART_LIST_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
