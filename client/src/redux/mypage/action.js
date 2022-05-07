import axios from 'axios';
import { LOGIN_USER } from '../login/type';
import { UPDATE_USER } from './type';

const http = "http://localhost:4000";

export const updateUser = (data) => (dispatch) => {
  axios
    .post(`${http}/my`, data)
    .then((response) => response.data)
    .then((res) => {
      dispatch({
        type: UPDATE_USER,
        payload: { id: res.id, name: res.name, email: res.email, message: res.message }
      })
    })
};

export const updateId = (data) => {
  return {
    type: LOGIN_USER,
    payload: {},
  }
};