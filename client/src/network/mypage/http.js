import axios from 'axios';
import { getCookie } from '../../utils/cookie';

const http = "http://localhost:4000";
const tkn = getCookie("users");

const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tkn}`,
  },
};

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
    .put(`${http}/my/changepw`, data, config)
    .then(({data}) => {
      alert(data.message);
    })
    .catch(({ response : { data }}) => {
      if (!data.success) alert(data.message);
    });
};