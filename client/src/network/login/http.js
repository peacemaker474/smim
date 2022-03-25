import axios from 'axios';

const http = "http://localhost:4000";

export const checkLogin = (data) => {
  axios.post(`${http}/login`, data);
};