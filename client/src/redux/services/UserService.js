import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* 
  추후에 catch 부분 추가해야 할 부분이 있음.
  이미지 업로드 부분과 로그아웃 부분
*/

const http = process.env.REACT_APP_SERVER_URL;

const config = {
  headers: {
    'content-type': 'multipart/form-data',
  }
};

export const postUserLogin = createAsyncThunk(
  "POST_LOGIN",
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${http}/login`, loginData, {
        headers: {
          "Access-Control-Allow-Origin": true,
        },
        withCredentials: true,
      } );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const putUpdateUser = createAsyncThunk(
  "PUT_UPDATE/USER",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${http}/my/update-user`, userData, {
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        }
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const putUserImage = createAsyncThunk(
  "PUT_UPDATE/IMAGE",
  async (imageData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${http}/my/update-image`, imageData, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserLogOut = createAsyncThunk(
  "GET_LOGOUT",
  async () => {
    try {
      const { data } = await axios.get(`${http}/logout`, {
        crossDomain: true,
        withCredentials: true,
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
)