// Create order
export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ORDER_CREATE_REQUEST':
      return {
        loading: true,
      };
    case 'ORDER_CREATE_SUCCESS':
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case 'ORDER_CREATE_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    case 'ORDER_CREATE_RESET':
      return {};
    default:
      return state;
  }
};

// Get order details by id
export const orderDetailsReducer = (
  state = { loading: true, order: {} },
  action
) => {
  switch (action.type) {
    case 'ORDER_DETAILS_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'ORDER_DETAILS_SUCCESS':
      return {
        loading: false,
        order: action.payload,
      };
    case 'ORDER_DETAILS_FAIL':
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// Get order by specific user
export const ordersByUserReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ORDER_LIST_REQUEST':
      return { ...state, loading: true };
    case 'ORDER_LIST_SUCCESS':
      return { loading: false, order: action.payload };
    case 'ORDER_LIST_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get all orders - admin
export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case 'ORDER_LIST_REQUEST':
      return {
        loading: true,
      };
    case 'ORDER_LIST_SUCCESS':
      return {
        loading: false,
        orders: action.payload,
      };
    case 'ORDER_LIST_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Update order to paid - admin
export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ORDER_PAY_REQUEST':
      return {
        loading: true,
      };
    case 'ORDER_PAY_SUCCESS':
      return {
        loading: false,
        success: true,
      };
    case 'ORDER_PAY_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    case 'ORDER_PAY_RESET':
      return {};
    default:
      return state;
  }
};

// Update order to deliver - admin
export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ORDER_DELIVER_REQUEST':
      return {
        loading: true,
      };
    case 'ORDER_DELIVER_SUCCESS':
      return {
        loading: false,
        success: true,
      };
    case 'ORDER_DELIVER_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    case 'ORDER_DELIVER_RESET':
      return {};
    default:
      return state;
  }
};

// Update order status - admin
export const orderStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ORDER_STATUS_REQUEST':
      return {
        loading: true,
      };
    case 'ORDER_STATUS_SUCCESS':
      return {
        loading: false,
        success: true,
      };
    case 'ORDER_STATUS_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    case 'ORDER_STATUS_RESET':
      return {};
    default:
      return state;
  }
};
