import axios from 'axios';

const http = 'http://localhost:4000';

export const postCreatePost = (data, header) => {
  return axios.post(`${http}/post/create`, data, header);
};

export const deletePost = (id, header) => {
  return axios.delete(`${http}/post/${id}`, header);
};

export const putPostEdit = (id, data, header) => {
  return axios.put(`${http}/post/${id}`, data, header);
};

export const getPostListRead = (targetAge, page = 1, filter, data) => {
  return axios.get(
    `${http}/post/target?age=${targetAge}&page=${page}&filter=${filter}&tag=${data.option}&keyword=${data.inputs}`
  );
};

export const getReadPostDetail = (id) => {
  return axios.get(`${http}/post/${id}`, {
    withCredentials: true,
  });
};

export const getPostLike = (id, header) => {
  return axios.get(`${http}/post/${id}/like`, header);
};

export const getPostUnlike = (id, header) => {
  return axios.get(`${http}/post/${id}/unlike`, header);
};

export const getBookmark = (id, header) => {
  return axios.get(`${http}/post/${id}/bookmark`, header);
};

export const getUnbookmark = (id, header) => {
  return axios.get(`${http}/post/${id}/unbookmark`, header);
};

export const getSearchPost = (age, page = 1, data) => {
  return axios.get(
    `${http}/post/search?age=${age}}&page=${page}&tag=${data.option}&keyword=${data.search}`
  );
};

export const getPostView = (id) => {
  return axios.get(`${http}/post/${id}/view`);
};
