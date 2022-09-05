import axios from 'axios';

const http = process.env.REACT_APP_SERVER_URL;

export const getCommentListRead = (id) => {
  return axios.get(`${http}/post/${id}/comment`, {
    withCredentials: true,
  });
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

export const getCommentUnpinned = (id, header) => {
  return axios.get(`${http}/comment/${id}/unpinned`, header);
};

export const getCommentLike = (id, header) => {
  return axios.get(`${http}/comment/${id}/like`, header);
};

export const getCommentUnlike = (id, header) => {
  return axios.get(`${http}/comment/${id}/unlike`, header);
};
