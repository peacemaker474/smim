import axios from 'axios';

const http = 'http://localhost:4000';

export const getCommentListRead = (data) => {
  return axios.get(`${http}/post/comment`, { params: data });
};

export const postCommentCreate = (data, header) => {
  return axios.post(`${http}/post/comment`, data, header);
};
