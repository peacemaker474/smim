import axios from 'axios';
import { SearchHTTPProps } from '../../type/postTypes';
import { CreateDataHTTPProps, ParaProps } from '../../type/postFormTypes';

const http = process.env.REACT_APP_SERVER_URL;

export const postCreateAndEditPost = (data: CreateDataHTTPProps, accessToken: string | null, id?: string | null) => {
  if (id) {
    return axios.put(`${http}/post/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return axios.post(`${http}/post/create`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getPostListRead = (targetAge: string, filter: string, data: SearchHTTPProps, page = 1) => {
  return axios.get(
    `${http}/post/target?age=${targetAge}&page=${page}&filter=${filter}&tag=${data.option}&keyword=${data.keyword}`,
  );
};

export const deletePost = (id: string, accessToken: string | null) => {
  return axios.delete(`${http}/post/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getReadPostDetail = (id: string) => {
  return axios.get(`${http}/post/${id}`, {
    withCredentials: true,
  });
};

export const deletePostImg = (delData: ParaProps, accessToken: string | null) => {
  axios.delete(`${process.env.REACT_APP_SERVER_URL}/post/img`, {
    data: {
      content: delData,
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getPostView = (id: string) => {
  return axios.get(`${http}/post/${id}/view`);
};

export const getPostLike = (id: string, accessToken: string | null) => {
  return axios.get(`${http}/post/${id}/like`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getPostUnlike = (id: string, accessToken: string | null) => {
  return axios.get(`${http}/post/${id}/unlike`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getBookmark = (id: string, accessToken: string | null) => {
  return axios.get(`${http}/post/${id}/bookmark`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getUnbookmark = (id: string, accessToken: string | null) => {
  return axios.get(`${http}/post/${id}/unbookmark`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const postReport = (id: string, data: { type: string }, accessToken: string | null) => {
  return axios.post(`${http}/report/post/${id}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
