import axios from "axios";

const http = "http://localhost:4000";

export const getMainPostLists = () => {
  return axios.get(`${http}`);
}

export const postCreateAccessToken = (data) => {
  return axios.post(`${http}/token`, data);
} 