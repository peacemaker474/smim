import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import { LOGIN_USER, LOGOUT_USER, SET_MESSAGE, UPDATE_IMAGE, UPDATE_USER } from './type';
import { loginClose } from '../toggle/action';

const http = "http://localhost:4000";

const config = {
  Headers: {
    'content-type': 'multipart/form-data',
  },
};

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
        payload: { id: res.id, name: res.name, email: res.email, success: res.success, message: res.message, social: res.social, imgUrl: res.imageUrl }
      });
      if (res.success) dispatch(loginClose());
    });
};

export const updateUser = (data) => (dispatch) => {
  axios
    .put(`${http}/my`, data, config)
    .then((response) => response.data)
    .then((res) => {
      dispatch({
        type: UPDATE_USER,
        payload: { id: res.id, name: res.name, email: res.email, message: res.message, imgUrl: res.imageUrl, success: res.success }
      })
    })
};

export const updateImage = (data) => (dispatch) => {
  axios
    .put(`${http}/my`, data, config)
    .then((response) => response.data)
    .then((res) => {
      dispatch({
        type: UPDATE_IMAGE,
        payload: {imgUrl: res.imageUrl}
      })
    })
}

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