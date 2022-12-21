import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserData, LoginData, UpdateUserData, MyData, UpdateImageData, ImageData, ErrorMessage } from './type';

const http = process.env.REACT_APP_SERVER_URL;

export const postUserLogin = createAsyncThunk<UserData, LoginData, { rejectValue: ErrorMessage }>(
  'POST_LOGIN',
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${http}/login`, loginData, {
        withCredentials: true,
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const putUpdateUser = createAsyncThunk<UpdateUserData, MyData, { rejectValue: ErrorMessage }>(
  'PUT_UPDATE/USER',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${http}/my/update-user`, userData, {
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const putUserImage = createAsyncThunk<UpdateImageData, ImageData, { rejectValue: ErrorMessage }>(
  'PUT_UPDATE/IMAGE',
  async (newData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${http}/my/update-image`, newData.imageData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${newData.accessToken}`,
        }
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserLogOut = createAsyncThunk('GET_LOGOUT', async () => {
  try {
    const { data } = await axios.get(`${http}/logout`, {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
});