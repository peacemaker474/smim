import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import loginReducer from './login/reducer';
import toggleReducer from './toggle/reducer';
import postReducer from './post/reducer';
import postFormReducer from './postForm/reducer';

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['loginReducer'],
};

const rootReducer = combineReducers({
  loginReducer,
  toggleReducer,
  postReducer,
  postFormReducer,
});

export default persistReducer(persistConfig, rootReducer);
