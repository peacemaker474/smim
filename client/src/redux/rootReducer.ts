import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import storageSession from 'redux-persist/lib/storage/session';
import authSlice from './slice/authSlice';
import toggleSlice from './slice/toggleSlice';
import userSlice from './slice/userSlice';
import searchKeywordSlice from './slice/searchKeywordSlice';
import searchFilterSlice from './slice/searchFilterSlice';
import commentSlice from './slice/commentSlice';
import commentCreateSlice from './slice/commentCreateSlice';
import postSlice from './slice/postSlice';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  blacklist: ['user', 'toggle', 'comment', 'commentCreate'],
};

const userPersistConfig = {
  key: 'user',
  storage: storageSession,
  whitelist: ['id', 'name', 'email', 'success', 'loginCheck', 'imgUrl', 'social', 'ageGroup'],
};

const rootReducer = combineReducers({
  toggle: toggleSlice.reducer,
  user: persistReducer(userPersistConfig, userSlice.reducer),
  auth: authSlice.reducer,
  searchKeyword: searchKeywordSlice.reducer,
  searchFilter: searchFilterSlice.reducer,
  comment: commentSlice.reducer,
  commentCreate: commentCreateSlice.reducer,
  post: postSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
