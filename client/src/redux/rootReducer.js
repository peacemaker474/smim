import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userSlice from './slice/userSlice';
import toggleSlice from './slice/toggleSlice';
import postCreateSlice from './slice/postCreateSlice';
import postFormCheckSlice from './slice/postFormCheckSlice';
import commentSlice from './slice/commentSlice';

import { tokenSlice } from './auth';

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['user'],
};

const rootReducer = combineReducers({
  user: userSlice.reducer,
  toggle: toggleSlice.reducer,
  authToken: tokenSlice.reducer,
  postCreate: postCreateSlice,
  postFormCheck: postFormCheckSlice,
  comment: commentSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
