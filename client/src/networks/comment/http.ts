import axios from 'axios';

const http = 'http://localhost:4000';

interface CreateProps {
  post_id: string | undefined;
  content: string;
  parent_id: string | null;
}

interface EditProps {
  post_id: string | undefined;
  content: string;
}

export const postCommentCreate = (data: CreateProps, accessToken: string | null) => {
  return axios.post(`${http}/post/comment`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const putCommentEdit = (id: string | undefined, data: EditProps, accessToken: string | null) => {
  return axios.put(`${http}/comment/${id}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const deleteComment = (id: string | null, accessToken: string | null) => {
  return axios.delete(`${http}/comment/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getCommentListRead = (id: string) => {
  return axios.get(`${http}/post/${id}/comment`, {
    withCredentials: true,
  });
};

export const getCommentLike = (id: string | undefined, accessToken: string | null) => {
  return axios.get(`${http}/comment/${id}/like`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getCommentUnlike = (id: string | undefined, accessToken: string | null) => {
  return axios.get(`${http}/comment/${id}/unlike`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getCommentPinned = (id: string | null, accessToken: string | null) => {
  return axios.get(`${http}/comment/${id}/pinned`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getCommentUnpinned = (id: string | null, accessToken: string | null) => {
  return axios.get(`${http}/comment/${id}/unpinned`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
