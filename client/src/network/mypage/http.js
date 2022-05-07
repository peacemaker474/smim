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

export const checkMyId = (data) => {
  return axios.get(`${http}/my/id-check?userId=${data}`).then((res) => {
    return res;
  })
};

export const checkMyName = (data) => {
  return axios.get(`${http}/my/name-check?userName=${data}`).then((res) => {
    return res;
  })
};

export const putPassword = (data) => {
  return axios
    .put(`${http}/my/changepw`, data)
    .then((res) => res.data)
    .catch((err) => err);
};