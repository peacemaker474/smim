import axios from 'axios';

const http = 'http://localhost:4000';

export const postUpload = (data, header) => {
  return axios.post(`${http}/post/create`, data, header);
};

export const postListRead = (targetAge, header) => {
  console.log(targetAge);
  return axios.get(`${http}/post/target?age=${targetAge}`, header);
};

export const postDetailRead = (id, header) => {
  return axios.get(`${http}/post/${id}`, header);
};

export const postLike = (id, header) => {
  return axios.get(`${http}/post/${id}/like`, header);
};

export const postUnlike = (id, header) => {
  return axios.get(`${http}/post/${id}/unlike`, header);
};
