import axios from "axios";

const http = "http://localhost:4000";

export const getMainPostLists = async () => {
  const { data } = await axios.get(`${http}`);
  return data;
}

export const postCreateAccessToken = (data) => {
  return axios.post(`${http}/token`, data);
} 