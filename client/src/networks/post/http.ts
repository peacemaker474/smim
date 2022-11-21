import axios from 'axios';

const http = 'http://localhost:4000';

interface ParaProps {
  para: string;
  img: Array<string>;
}

interface CreateDataProps {
  title: string | null;
  content: ParaProps;
  targetAge: string | null;
  hashtag: Array<string>;
}

export const postCreateAndEditPost = (data: CreateDataProps, accessToken: string | null, id?: string | null) => {
  if (id) {
    return axios.post(`${http}/post/create`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return axios.put(`${http}/post/${id}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getPostListRead = (targetAge: string | undefined, filter: any, data: any, page = 1) => {
  return axios.get(
    `${http}/post/target?age=${targetAge}&page=${page}&filter=${filter}&tag=${data.option}&keyword=${data.inputs}`,
  );
};

export const deletePost = (id: string | undefined, accessToken: string | null) => {
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

export const getPostLike = (id: string | undefined, accessToken: string | null) => {
  return axios.get(`${http}/post/${id}/like`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getPostUnlike = (id: string | undefined, accessToken: string | null) => {
  return axios.get(`${http}/post/${id}/unlike`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getBookmark = (id: string | undefined, accessToken: string | null) => {
  return axios.get(`${http}/post/${id}/bookmark`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getUnbookmark = (id: string | undefined, accessToken: string | null) => {
  return axios.get(`${http}/post/${id}/unbookmark`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
