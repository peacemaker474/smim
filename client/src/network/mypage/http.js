import axios from 'axios';

const http = "http://localhost:4000";

export const getMyWriteLists = (data) => {
  return axios.get(`${http}/my/writeLists?userId=${data}`).then(res => {
    return res.data;
  });
}

export const getBookMarkLists = (data) => {
  return axios.get(`${http}/my/bookmarkLists?userId=${data}`).then(res => {
    return res.data;
  });
}

export const getCheckMyId = (data) => {
  return axios.get(`${http}/my/id-check?userId=${data}`).then((res) => {
    return res;
  })
};

export const getCheckMyName = (data) => {
  return axios.get(`${http}/my/name-check?userName=${data}`).then((res) => {
    return res;
  })
};

export const putChangePassWord = (data) => {
  return axios
    .put(`${http}/my/changepw`, data)
    .then(({data}) => {
      if (!data.success) alert(data.message);
    })
    .catch((err) => err);
};