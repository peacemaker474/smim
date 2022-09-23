import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

import userSlice from './slice/userSlice';
import toggleSlice from './slice/toggleSlice';
import commentCreateSlice from './slice/commentCreateSlice';
import postSlice from './slice/postSlice';
import { tokenSlice } from './auth';
import commentSlice from './slice/commentSlice';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  blacklist: ['user', 'toggle', 'comment', 'commentCreate'],
};

const userPersistConfig = {
  key: 'user',
  storage: storageSession,
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
