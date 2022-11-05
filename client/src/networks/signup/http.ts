import axios from 'axios';

const http = process.env.REACT_APP_SERVER_URL;

export const getCheckId = (data: any) => {
  return axios.get(`${http}/signup/id-check?userId=${data}`).then((res) => {
    return res;
  });
};

export const getCheckEmail = (data: any) => {
  return axios.get(`${http}/signup/email-check?email=${data}`).then((res) => {
    return res;
  })
};

export const getCheckName = (data: any) => {
  return axios.get(`${http}/signup/name-check?nickname=${data}`).then((res) => {
    return res;
  })
};

export const postSignupSubmit = (data: any) => {
  return axios.post(`${http}/signup`, data).then((res) => res);
};