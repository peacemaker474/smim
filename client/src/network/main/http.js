import axios from 'axios';

const http = 'http://localhost:4000';

export const getMainPostLists = async () => {
  const { data } = await axios.get(`${http}`, {
    withCredentials: true,
  });
  return data;
};

export const getCreateAccessToken = () => {
  return axios.get(`${http}/token`, {
    withCredentials: true,
  });
};
