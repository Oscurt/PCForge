import Axios from 'axios';
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
} from '../constants/userConstants';

export const register = (usuario, clave) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { usuario, clave } });
  try {
    Axios.defaults.baseURL = 'http://localhost:3001/';
    const { data } = await Axios.post('/api/register', {
      usuario,
      clave,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signin = (usuario, clave) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { usuario, clave } });
  try {
    Axios.defaults.baseURL = 'http://localhost:3001/';
    const { data } = await Axios.post('/api/login', { usuario, clave });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const signout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_SIGNOUT });
};

export const detailsUser = (usuario) => async (dispatch) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: usuario });
  try {
    Axios.defaults.baseURL = 'http://localhost:3001/';
    const { data } = await Axios.get(`/api/profile/${usuario}`);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};