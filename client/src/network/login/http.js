import axios from 'axios';
import { getCookie, setCookie } from '../../utils/cookie';

const http = "http://localhost:4000";

export const checkLogin = (data) => {
  axios.post(`${http}/login`, data, {
    headers: {
      Authorization: getCookie("users"),
    }
  }).then((res) => {
    console.log(res);
    setCookie("users", res.data.accessToken);
  });
};