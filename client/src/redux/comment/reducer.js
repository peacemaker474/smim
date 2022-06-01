import { CREATE_COMMENT } from './type';

const initialState = [];

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_COMMENT:
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
