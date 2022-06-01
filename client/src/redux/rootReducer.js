import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import loginReducer from './login/reducer';
import toggleReducer from './toggle/reducer';
import postCreateReducer from './postCreate/reducer';
import postFormReducer from './postForm/reducer';
import commentReducer from './comment/reducer';

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['loginReducer'],
};

const rootReducer = combineReducers({
  loginReducer,
  toggleReducer,
  postCreateReducer,
  postFormReducer,
  commentReducer,
});

export default persistReducer(persistConfig, rootReducer);
