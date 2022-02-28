import { TITLE_ADD, CONTENT_ADD, TARGETAGE_ADD, TAG_ADD, TAG_DELETE, POST_RESET } from './type';

const initialState = {
  title: '',
  targetAge: 0,
  hashArr: [],
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
        hashArr: [...state.hashArr, action.payload.hashtag],
      };
    case TAG_DELETE:
      return {
        ...state,
        hashArr: [...state.hashArr].filter((el) => el !== action.payload.hashtag),
      };
    case POST_RESET:
      return {
        title: '',
        targetAge: 0,
        hashArr: [],
        content: '',
      };
    default:
      return state;
  }
}
