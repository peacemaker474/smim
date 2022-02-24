import axios from 'axios';

const http = "http://localhost:4000";

export const signUp = (data) => {
  return axios.post(`${http}/signup`, data).then((res) => res);
};