import axios from 'axios';

const http = "http://localhost:4000";

export const postUpload = (data, header) => {
  return axios.post(`${http}/post/create`, data, header);
};
