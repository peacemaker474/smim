import axios from 'axios';

const http = "http://localhost:4000";

export const myWriteLists = () => {
  return axios.get(`${http}/my/writeLists`);
}

export const myFavoriteLists = () => {
  return axios.get(`${http}/my/favoriteLists`);
}