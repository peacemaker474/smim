import { COMMENT_WRITE } from './type';

const initialState = [];

export default function commentCreateReducer(state = initialState, action) {
  switch (action.type) {
    case COMMENT_WRITE:
      return [
        ...state,
        {
          text: action.payload.text,
          _id: action.payload._id,
          createAt: action.payload.createAt,
          like_count: action.payload.like_count,
          writer_id: action.payload.writer_id,
          parent_id: action.payload.parent_id,
        },
      ];

    default:
      return [...state];
  }
}
