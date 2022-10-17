import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import postSlice from './slice/postSlice';
import toggleSlice from './slice/toggleSlice';
import userSlice from './slice/userSlice';

const rootReducer = combineReducers({
  toggle: toggleSlice.reducer,
  post: postSlice,
  user: userSlice.reducer,
  auth: authSlice.reducer,
});

export default rootReducer;