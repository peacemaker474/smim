import { combineReducers } from '@reduxjs/toolkit';
import postSlice from './slice/postSlice';
import toggleSlice from './slice/toggleSlice';

const rootReducer = combineReducers({
  toggle: toggleSlice.reducer,
  post: postSlice,
});

export default rootReducer;