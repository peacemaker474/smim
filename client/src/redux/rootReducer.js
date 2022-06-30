import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userSlice from './slice/userSlice';
import toggleSlice from './slice/toggleSlice';
import postCreateSlice from './slice/postCreateSlice';
import postFormCheckSlice from './slice/postFormCheckSlice';
import commentCreateSlice from './slice/commentCreateSlice';
import commentDataSlice from './slice/commentDataSlice';
import { tokenSlice } from './auth';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
};

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['id', 'name', 'email', 'success', 'loginCheck', 'imgUrl', 'social'],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userSlice.reducer),
  toggle: toggleSlice.reducer,
  authToken: tokenSlice.reducer,
  postCreate: postCreateSlice,
  postFormCheck: postFormCheckSlice,
  commentCreate: commentCreateSlice,
  comment: commentDataSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
