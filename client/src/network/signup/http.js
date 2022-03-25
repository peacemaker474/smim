import axios from 'axios';

const http = "http://localhost:4000";

export const checkId = (data) => {
  return axios.get(`${http}/signup/id-check?userId=${data}`).then((res) => {
    return res;
  });
};

export const checkEmail = (data) => {
  return axios.get(`${http}/signup/email-check?email=${data}`).then((res) => {
    return res;
  })
};

export const checkName = (data) => {
  return axios.get(`${http}/signup/name-check?nickname=${data}`).then((res) => {
    return res;
  })
};

export const signUp = (data) => {
  return axios.post(`${http}/signup`, data).then((res) => res);
};