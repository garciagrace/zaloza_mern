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
    case 'PRODUCT_DETAILS_RESET':
      return { product: {} };
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
      return { loading: true, success: false };
    case 'PRODUCT_CREATE_SUCCESS':
      return { loading: false, success: true, products: action.payload };
    case 'PRODUCT_CREATE_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Update product - admin
export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case 'PRODUCT_UPDATE_REQUEST':
      return { loading: true };
    case 'PRODUCT_UPDATE_SUCCESS':
      return { loading: false, success: true, product: action.payload };
    case 'PRODUCT_UPDATE_FAIL':
      return { loading: false, error: action.payload };
    case 'PRODUCT_UPDATE_RESET':
      return { success: false, product: {} };
    default:
      return state;
  }
};
