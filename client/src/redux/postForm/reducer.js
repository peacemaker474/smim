import { TITLE_CHECK, AGE_CHECK, HASHTAG_CHECK, CONTENT_CHECK, RESET_CHECK } from './type';

const initialState = {
  title: false,
  age: false,
  hashtag: false,
  content: false,
};

export default function postFormReducer(state = initialState, action) {
  switch (action.type) {
    case TITLE_CHECK:
      return {
        ...state,
        ...action.payload,
      };
    case AGE_CHECK:
      return {
        ...state,
        ...action.payload,
      };
    case HASHTAG_CHECK:
      return {
        ...state,
        ...action.payload,
      };
    case CONTENT_CHECK:
      return {
        ...action.payload,
      };

    case RESET_CHECK:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
