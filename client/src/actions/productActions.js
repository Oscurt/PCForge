import Axios from 'axios';
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  POPULAR_PRODUCT_DETAILS_FAIL,
  POPULAR_PRODUCT_DETAILS_REQUEST,
  POPULAR_PRODUCT_DETAILS_SUCCESS,
  COMENTARIO_PRODUCT_DETAILS_FAIL,
  COMENTARIO_PRODUCT_DETAILS_REQUEST,
  COMENTARIO_PRODUCT_DETAILS_SUCCESS,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_FAIL,
  PROD_CATEGORY_LIST_SUCCESS,
  PROD_CATEGORY_LIST_REQUEST,
  PROD_CATEGORY_LIST_FAIL,
} from '../constants/productConstants';

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    Axios.defaults.baseURL = 'http://localhost:3001/';
    const { data } = await Axios.get('/api/products');
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    Axios.defaults.baseURL = 'http://localhost:3001/';
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const popularProduct = () => async (dispatch) => {
  dispatch({
    type: POPULAR_PRODUCT_DETAILS_REQUEST
  });
  try {
    Axios.defaults.baseURL = 'http://localhost:3001/';
    const { data } = await Axios.get(`/api/pop_prod`);
    dispatch({ type: POPULAR_PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POPULAR_PRODUCT_DETAILS_FAIL,
      payload:
        error.message
    });
  }
};

export const commentProduct = (productId) => async (dispatch) => {
  dispatch({ type: COMENTARIO_PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    Axios.defaults.baseURL = 'http://localhost:3001/';
    const { data } = await Axios.get(`/api/comentario/${productId}`);
    dispatch({ type: COMENTARIO_PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COMENTARIO_PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductCategories = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/cats`);
    dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

export const catlistProducts = (catId) => async (dispatch) => {
  dispatch({
    type: PROD_CATEGORY_LIST_REQUEST,
  });
  try {
    Axios.defaults.baseURL = 'http://localhost:3001/';
    const { data } = await Axios.get(`/api/productscat/${catId}`);
    dispatch({ type: PROD_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PROD_CATEGORY_LIST_FAIL, payload: error.message });
  }
};