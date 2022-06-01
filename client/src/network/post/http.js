import axios from 'axios';

const http = 'http://localhost:4000';

export const postPostCreate = (data, header) => {
  return axios.post(`${http}/post/create`, data, header);
};

export const deletePost = (id, header) => {
  return axios.delete(`${http}/post/${id}`, header);
};

export const postPostEdit = (id, header) => {
  return axios.post(`${http}/post/${id}`, header);
};

export const getPostListRead = (targetAge, header) => {
  return axios.get(`${http}/post/target?age=${targetAge}`, header);
};

export const getPostDetailRead = (id, header = undefined) => {
  if (header) {
    return axios.get(`${http}/post/${id}/detail`, header);
  } else {
    return axios.get(`${http}/post/${id}`);
  }
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

export const getSearchPost = (data) => {
  return axios.get(
    `${http}/post/search?age=${data.target}&tag=${data.option}&keyword=${data.search}`
  );
};
