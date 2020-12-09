import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
  productCategoryListReducer,
  productDetailsReducer,
  productListReducer,
  productPopReducer,
  commentProductReducer,
  productListCatReducer,
} from './reducers/productReducers';
import {
  userRegisterReducer,
  userSigninReducer,
  userDetailsReducer,
} from './reducers/userReducers';

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
};
const reducer = combineReducers({
  productPop: productPopReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  productComment: commentProductReducer,
  productCategoryList: productCategoryListReducer,
  productbyCat: productListCatReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;