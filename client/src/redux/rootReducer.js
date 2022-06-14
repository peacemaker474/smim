import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import loginReducer from './login/reducer';
import toggleReducer from './toggle/reducer';
// import postCreateReducer from './postCreate/reducer';
import postCreateSlice from './postCreate/postCreateSlice';
import postFormCheckSlice from './postForm/postFormCheckSlice';
import commentSlice from './comment/commentSlice';
// import postFormReducer from './postForm/reducer';

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['login'],
};

const rootReducer = combineReducers({
  login: loginReducer,
  toggle: toggleReducer,
  postCreate: postCreateSlice,
  postFormCheck: postFormCheckSlice,
  comment: commentSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
