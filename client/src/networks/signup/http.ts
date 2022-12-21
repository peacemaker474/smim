import axios from 'axios';

const http = process.env.REACT_APP_SERVER_URL;

interface SignupSubmitData {
  userId: string;
  email: string;
  nickname: string;
  birthday: string;
  password: string;
}

export const getCheckId = (data: string) => {
  return axios.get(`${http}/signup/id-check?userId=${data}`).then((res) => {
    return res;
  });
};

export const getCheckEmail = (data: string) => {
  return axios.get(`${http}/signup/email-check?email=${data}`).then((res) => {
    return res;
  })
};

export const getCheckName = (data: string) => {
  return axios.get(`${http}/signup/name-check?nickname=${data}`).then((res) => {
    return res;
  })
};

export const postSignupSubmit = (data: SignupSubmitData) => {
  return axios.post(`${http}/signup`, data).then((res) => res);
};