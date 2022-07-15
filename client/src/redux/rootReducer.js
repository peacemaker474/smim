import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userSlice from './slice/userSlice';
import toggleSlice from './slice/toggleSlice';
import commentCreateSlice from './slice/commentCreateSlice';
import postSlice from './slice/postSlice';
import { tokenSlice } from './auth';
import commentSlice from './slice/commentSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user', 'toggle', 'comment', 'commentCreate'],
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
  post: postSlice,
  commentCreate: commentCreateSlice,
  comment: commentSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
