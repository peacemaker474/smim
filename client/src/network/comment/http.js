import axios from 'axios';

const http = 'http://localhost:4000';

export const getCommentListRead = (id) => {
  return axios.get(`${http}/post/${id}/comment`);
};

export const postCommentCreate = (data, header) => {
  return axios.post(`${http}/post/comment`, data, header);
};

export const putCommentEdit = (id, data, header) => {
  return axios.put(`${http}/comment/${id}`, data, header);
};

export const deleteComment = (id, header) => {
  return axios.delete(`${http}/comment/${id}`, header);
};

export const getCommentPinned = (id, header) => {
  return axios.get(`${http}/comment/${id}/pinned`, header);
};
