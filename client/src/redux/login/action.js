import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import { LOGIN_USER, LOGOUT_USER, SET_MESSAGE, UPDATE_USER } from './type';
import { loginClose } from '../toggle/action';

const http = "http://localhost:4000";

export const loginUser = (data) => (dispatch) => {
  axios
    .post(`${http}/login`, data, {
      headers: {
        Authorization: getCookie("users"),
      }
    })
    .then((response) => response.data)
    .then((res) => {
      setCookie("users", res.accessToken);
      dispatch({
        type: LOGIN_USER,
        payload: { id: res.id, name: res.name, email: res.email, success: res.success, message: res.message, social: res.social }
      });
      if (res.success) dispatch(loginClose());
    });
};

export const updateUser = (data) => (dispatch) => {
  axios
    .put(`${http}/my`, data)
    .then((response) => response.data)
    .then((res) => {
      setCookie("users", res.accessToken);
      console.log(res);
      dispatch({
        type: UPDATE_USER,
        payload: { id: res.id, name: res.name, email: res.email, success: res.success, message: res.message }
      });
    });
};

export const logoutUser = () => (dispatch) => {
  axios.get(`${http}/logout`, {crossDomain: true}).then((response) => {
    if (response.data.success) {
      deleteCookie("users");
      dispatch({ type: LOGOUT_USER });
    }
  });
};

export const setMessage = () => (dispatch) => {
  dispatch({ type: SET_MESSAGE });
};