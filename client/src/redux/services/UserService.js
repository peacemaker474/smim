import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const http = process.env.REACT_APP_SERVER_URL;

export const postUserLogin = createAsyncThunk(
  'POST_LOGIN',
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${http}/login`, loginData, {
        withCredentials: true,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const putUpdateUser = createAsyncThunk(
  'PUT_UPDATE/USER',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${http}/my/update-user`, userData, {
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const putUserImage = createAsyncThunk(
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
    } catch (err) {
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
