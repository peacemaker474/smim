import axios from 'axios';

const http = 'http://localhost:4000';

export const postCreatePost = (data, header) => {
  return axios.post(`${http}/post/create`, data, header);
};

export const postDelete = (id, header) => {
  return axios.delete(`${http}/post/${id}`, header);
};

export const postEdit = (id, header) => {
  return axios.post(`${http}/post/${id}`, header);
};

export const postListRead = (targetAge, header) => {
  return axios.get(`${http}/post/target?age=${targetAge}`, header);
};

export const postReadPostDetail = (id, header = undefined) => {
  if (header) {
    return axios.get(`${http}/post/${id}/detail`, header);
  } else {
    return axios.get(`${http}/post/${id}`);
  }
};

export const postLike = (id, header) => {
  return axios.get(`${http}/post/${id}/like`, header);
};

export const postUnlike = (id, header) => {
  return axios.get(`${http}/post/${id}/unlike`, header);
};

export const postBookmark = (id, header) => {
  return axios.get(`${http}/post/${id}/bookmark`, header);
};

export const postUnbookmark = (id, header) => {
  return axios.get(`${http}/post/${id}/unbookmark`, header);
};

export const getSearchPost = (data) => {
  return axios.get(
    `${http}/post/search?age=${data.target}&tag=${data.option}&keyword=${data.search}`
  );
};
