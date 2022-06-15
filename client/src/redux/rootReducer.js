import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import loginReducer from './login/reducer';
import userSlice from './slice/userSlice';
import toggleSlice from './slice/toggleSlice';
import postCreateReducer from './postCreate/reducer';
import postFormReducer from './postForm/reducer';
import commentReducer from './comment/reducer';

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['user'],
};

const rootReducer = combineReducers({
  user: userSlice.reducer,
  toggle: toggleSlice.reducer,
  postCreate: postCreateReducer,
  postForm: postFormReducer,
  comment: commentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
