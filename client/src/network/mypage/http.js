import axios from 'axios';

const http = "http://localhost:4000";

export const myWriteLists = (data) => {
  return axios.get(`${http}/my/writeLists?userId=${data}`).then(res => {
    return res.data;
  });
}

export const myFavoriteLists = (data) => {
  return axios.get(`${http}/my/favoriteLists?userId=${data}`).then(res => {
    return res.data;
  });
}