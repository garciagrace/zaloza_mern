// All products by category
export const productListByCategoryReducer = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case 'PRODUCT_LIST_REQUEST':
      return { loading: true, products: [] };
    case 'PRODUCT_LIST_SUCCESS':
      return {
        loading: false,
        products: action.payload.products,
      };
    case 'PRODUCT_LIST_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Fetch single product by id
export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case 'PRODUCT_DETAILS_REQUEST':
      return { ...state, loading: true };
    case 'PRODUCT_DETAILS_SUCCESS':
      return { loading: false, product: action.payload };
    case 'PRODUCT_DETAILS_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get all products - admin
export const productAllReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case 'PRODUCT_LIST_ALL_REQUEST':
      return { ...state, loading: true };
    case 'PRODUCT_LIST_ALL_SUCCESS':
      return { loading: false, products: action.payload };
    case 'PRODUCT_LIST_ALL_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Create product - admin
export const productCreateReducer = (state = { products: {} }, action) => {
  switch (action.type) {
    case 'PRODUCT_CREATE_REQUEST':
      return { ...state, loading: true };
    case 'PRODUCT_CREATE_SUCCESS':
      return { loading: false, products: action.payload };
    case 'PRODUCT_CREATE_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
