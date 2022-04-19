import { TITLE_ADD, CONTENT_ADD, TARGETAGE_ADD, TAG_ADD, TAG_DELETE, POST_RESET } from './type';

const initialState = {
  title: '',
  targetAge: 0,
  hashtag: [],
  content: '',
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case TITLE_ADD:
      return {
        ...state,
        title: action.payload.title,
      };
    case CONTENT_ADD:
      return {
        ...state,
        content: action.payload.content,
      };
    case TARGETAGE_ADD:
      return {
        ...state,
        targetAge: action.payload.targetAge,
      };
    case TAG_ADD:
      return {
        ...state,
        hashtag: [...state.hashtag, action.payload.tag],
      };
    case TAG_DELETE:
      return {
        ...state,
        hashtag: state.hashtag.filter((el) => el !== action.payload.tag),
      };
    case POST_RESET:
      return {
        title: '',
        targetAge: 0,
        hashtag: [],
        content: '',
      };
    default:
      return { ...state };
  }
}
