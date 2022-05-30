import axios from "axios";

const http = "http://localhost:4000";

export const getMainPostLists = () => {
  return axios.get(`${http}`);
}