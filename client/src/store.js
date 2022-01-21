import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  productListByCategoryReducer,
  productDetailsReducer,
} from './reducers/productReducers';
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers';
import {
  cartAddItemReducer,
  cartClearReducer,
  cartListReducer,
  cartReducer,
  cartRemoveItemReducer,
} from './reducers/cartReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  ordersByUserReducer,
} from './reducers/orderReducers';

const reducer = combineReducers({
  // Product
  productListByCategory: productListByCategoryReducer,
  productDetails: productDetailsReducer,
  // User
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  // Cart
  cartList: cartListReducer,
  cartAddItem: cartAddItemReducer,
  cartRemoveItem: cartRemoveItemReducer,
  cart: cartReducer,
  cartClear: cartClearReducer,
  // Order
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  ordersByUser: ordersByUserReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const paymentDetailsFromStorage = localStorage.getItem('paymentDetails')
  ? JSON.parse(localStorage.getItem('paymentDetails'))
  : {};

const initialState = {
  cart: {
    shippingAddress: shippingAddressFromStorage,
    paymentDetails: paymentDetailsFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
