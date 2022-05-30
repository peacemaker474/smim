import { COMMENT_WRITE } from './type';

export const commentWrite = ({ text, _id, writer_id, createAt, parent_id }) => {
  return {
    type: COMMENT_WRITE,
    payload: {
      text,
      _id,
      writer_id,
      createAt,
      like_count: 0,
      parent_id,
    },
  };
};
