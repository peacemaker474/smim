import axios from 'axios';
import { getCookie, setCookie } from '../../utils/cookie';
import { LOGIN_USER, LOGOUT_USER, SET_MESSAGE } from './type';

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
      console.log(res);
      setCookie("users", res.accessToken);
      dispatch({
        type: LOGIN_USER,
        payload: { id: res.id, name: res.name, email: res.email, success: res.success, message: res.message }
      });
    });
};

export const logoutUser = () => (dispatch) => {
  axios.get(`${http}/logout`, {crossDomain: true}).then((response) => {
    if (response.data.success) {
      dispatch({ type: LOGOUT_USER });
    }
  });
};

export const setMessage = () => (dispatch) => {
  dispatch({ type: SET_MESSAGE });
}