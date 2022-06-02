import { CREATE_COMMENT } from './type';

export const createComment = ({ text, _id, writer, createAt, parent_id }) => {
  return {
    type: CREATE_COMMENT,
    payload: {
      text,
      _id,
      writer,
      createAt,
      like_count: 0,
      parent_id,
    },
  };
};
