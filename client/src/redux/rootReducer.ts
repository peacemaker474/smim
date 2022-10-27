import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import postSlice from './slice/postSlice';
import toggleSlice from './slice/toggleSlice';
import userSlice from './slice/userSlice';
import searchKeywordSlice from './slice/searchKeywordSlice';
import searchFilterSlice from './slice/searchFilterSlice';

const rootReducer = combineReducers({
  toggle: toggleSlice.reducer,
  post: postSlice,
  user: userSlice.reducer,
  auth: authSlice.reducer,
  searchKeyword: searchKeywordSlice.reducer,
  searchFilter: searchFilterSlice.reducer,
});

export default rootReducer;
