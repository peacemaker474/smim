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
