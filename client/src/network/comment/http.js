import axios from 'axios';

const http = 'http://localhost:4000';

export const CommentListRead = (data) => {
  return axios.get(`${http}/post/comment`, { params: data });
};

export const CommentCreate = (data, header) => {
  return axios.post(`${http}/post/comment`, data, header);
};
