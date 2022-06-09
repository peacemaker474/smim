import { CREATE_COMMENT } from './type';

export const createComment = ({ text, _id, writer, createAt, parent_id, group_id, post_id }) => {
  return {
    type: CREATE_COMMENT,
    payload: {
      text,
      _id,
      writer,
      createAt,
      like_count: 0,
      parent_id,
      group_id,
      post_id,
    },
  };
};
