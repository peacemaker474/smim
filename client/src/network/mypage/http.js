import axios from 'axios';
import checkedText from '../../utils/checkedText';
import { getCookie } from '../../utils/cookie';

const http = "http://localhost:4000";
const tkn = getCookie("users");

const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tkn}`,
  },
};

export const getMyWriteLists = async (userId) => {
  const { data } = await axios.get(`${http}/my/writeLists?userId=${userId}`);

  if (data.success) {
    const newData = data.writeLists.map((item) => {
      return {
        ...item,
        content: checkedText(item.content),
      }
    });
    return newData;
  } else {
    return data;
  }
}

export const getBookMarkLists = async (userId) => {
  const { data } = await axios.get(`${http}/my/bookmarkLists?userId=${userId}`);

  if (data.success) {
    const newData = data.bookMarkLists.map((item) => {
      return {
        ...item,
        content: checkedText(item.content),
      }
    });
    return newData;
  } else {
    return data;
  }
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
  return axios.put(`${http}/my/changepw`, data, config);
};