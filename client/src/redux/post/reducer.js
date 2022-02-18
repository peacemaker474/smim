import { TITLE_ADD, TARGETAGE_ADD, TAG_ADD, TAG_DELETE } from './type';


const initialState = {
	title: "",
	targetAge: 0,
	hashtag: "",
	hashArr: []
};


export default function postReducer(state = initialState, action) {
	switch (action.type) {
    case TITLE_ADD:
      return {
        ...state,
        title: action.payload.title,
			};
		
    case TARGETAGE_ADD:
      return {
        ...state,
        targetAge: action.payload.targetAge,
      };
    case TAG_ADD:
      return {
        ...state,
        hashtag: action.payload.hashtag,
        hashArr: [...state.hashArr, state.hashtag]
      };
    case TAG_DELETE:
      return {
        ...state,
        hashtag: action.payload.hashtag
      };
    default:
      return state;
  }
}