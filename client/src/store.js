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
} from './reducers/userReducers';

const reducer = combineReducers({
  // Product
  productListByCategory: productListByCategoryReducer,
  productDetails: productDetailsReducer,
  // User
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
