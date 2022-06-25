import axios from 'axios';

const http = 'http://localhost:4000';

export const getCommentListRead = (id) => {
  return axios.get(`${http}/post/${id}/comment`);
};

export const postCommentCreate = (data, header) => {
  return axios.post(`${http}/post/comment`, data, header);
};
