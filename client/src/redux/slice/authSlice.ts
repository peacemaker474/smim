import { createSlice } from '@reduxjs/toolkit';
import { postUserLogin } from '../services/UserService';

export const TOKEN_TIME_OUT = 600 * 1000; // 10분

interface TokenState {
  authenticated: boolean;
  accessToken: string | null;
  expireTime: number | null;
}

const initialState: TokenState = {
  authenticated: false,
  accessToken: null,
  expireTime: null,
};

export const authSlice = createSlice({
  name: 'authToken',
  initialState,
  reducers: {
    SET_TOKEN: (state, action) => {
      state.authenticated = true;
      state.accessToken = action.payload;
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
    },
    DELETE_TOKEN: (state) => {
      state.authenticated = false;
      state.accessToken = null;
      state.expireTime = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postUserLogin.fulfilled, (state, action) => {
      state.authenticated = true;
      state.accessToken = action.payload.accessToken;
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
    });
  },
});

export const { SET_TOKEN, DELETE_TOKEN } = authSlice.actions;

export default authSlice;
