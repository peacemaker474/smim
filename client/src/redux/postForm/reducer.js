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
        title: true,
        age: false,
        hashtag: false,
        content: false,
      };
    case AGE_CHECK:
      return {
        title: false,
        age: true,
        hashtag: false,
        content: false,
      };
    case HASHTAG_CHECK:
      return {
        title: false,
        age: false,
        hashtag: true,
        content: false,
      };
    case CONTENT_CHECK:
      return {
        title: false,
        age: false,
        hashtag: false,
        content: true,
      };
    case RESET_CHECK:
      return {
        title: false,
        age: false,
        hashtag: false,
        content: false,
      };
    default:
      return state;
  }
}
