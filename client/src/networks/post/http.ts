import axios from 'axios';

const http = 'http://localhost:4000';

export const getPostListRead = (targetAge: string | undefined, filter: any, data: any, page = 1) => {
  return axios.get(
    `${http}/post/target?age=${targetAge}&page=${page}&filter=${filter}&tag=${data.option}&keyword=${data.inputs}`,
  );
};
