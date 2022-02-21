import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  productListByCategoryReducer,
  productDetailsReducer,
  productAllReducer,
} from './reducers/productReducers';
import {
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
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
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
  ordersByUserReducer,
  orderStatusReducer,
} from './reducers/orderReducers';

const reducer = combineReducers({
  // Product
  productListByCategory: productListByCategoryReducer,
  productDetails: productDetailsReducer,
  productAll: productAllReducer,
  // User
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
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
  orderList: orderListReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderStatus: orderStatusReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const initialState = {
  cart: {
    shippingAddress: shippingAddressFromStorage,
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
