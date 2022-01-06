// Cart list
export const cartListReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case 'CART_LIST_REQUEST':
      return { ...state, loading: true };
    case 'CART_LIST_SUCCESS':
      return { loading: false, cartItems: action.payload };
    case 'CART_LIST_FAIL':
      return { loading: false, error: action.payload };
    case 'CART_LIST_RESET':
      return { cartItems: [] };
    default:
      return state;
  }
};

// Add item to cart
export const cartAddItemReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case 'CART_ADD_ITEM_REQUEST':
      return { ...state, loading: true };
    case 'CART_ADD_ITEM_SUCCESS':
      return { loading: false, success: true, cartItems: action.payload };
    case 'CART_ADD_ITEM_FAIL':
      return { loading: false, error: action.payload };
    case 'CART_ADD_ITEM_DONE':
      return { success: false };
    default:
      return state;
  }
};

// Remove item from cart
export const cartRemoveItemReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case 'CART_REMOVE_ITEM_REQUEST':
      return { ...state, loading: true };
    case 'CART_REMOVE_ITEM_SUCCESS':
      return { loading: false, success: true, cartItems: action.payload };
    case 'CART_REMOVE_ITEM_FAIL':
      return { loading: false, error: action.payload };
    case 'CART_REMOVE_ITEM_DONE':
      return { success: false };
    default:
      return state;
  }
};

// Save shipping address and payment method on local storage
export const cartReducer = (state = { shippingAddress: {} }, action) => {
  switch (action.type) {
    case 'CART_SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case 'CART_SAVE_PAYMENT_METHOD':
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
