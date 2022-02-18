import { combineReducers } from "redux";
import toggleReducer from "./toggle/reducer";
import postReducer from './post/reducer';


const rootReducer = combineReducers({
  toggleReducer,
  postReducer,
});

export default rootReducer;