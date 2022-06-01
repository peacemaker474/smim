import { CREATE_COMMENT } from './type';

export const createComment = ({ text, _id, writer_id, createAt, parent_id }) => {
  return {
    type: CREATE_COMMENT,
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
