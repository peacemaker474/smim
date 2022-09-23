import axios from 'axios';

const http = process.env.REACT_APP_SERVER_URL;

export const getMainPostLists = async () => {
  const { data } = await axios.get(`${http}`);
  return data;
};

export const getCreateAccessToken = () => {
  return axios.get(`${http}/token`, {
    withCredentials: true,
  });
};
