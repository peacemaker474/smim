import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import toggleSlice from './slice/toggleSlice';
import userSlice from './slice/userSlice';
import searchKeywordSlice from './slice/searchKeywordSlice';
import searchFilterSlice from './slice/searchFilterSlice';
import commentSlice from './slice/commentSlice';

const rootReducer = combineReducers({
  toggle: toggleSlice.reducer,
  user: userSlice.reducer,
  auth: authSlice.reducer,
  searchKeyword: searchKeywordSlice.reducer,
  searchFilter: searchFilterSlice.reducer,
  comment: commentSlice.reducer,
});

export default rootReducer;
