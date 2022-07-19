import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie, setRefreshToken } from "../../utils/cookie";

/* 
  추후에 catch 부분 추가해야 할 부분이 있음.
  이미지 업로드 부분과 로그아웃 부분
*/

const http = "http://localhost:4000";
const cookieName = "users";

const config = {
  headers: {
    'content-type': 'multipart/form-data',
  }
};

const verifyToken = {
  headers: {
    Authorization: getCookie(),
  }
};

export const postUserLogin = createAsyncThunk(
  "POST_LOGIN",
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${http}/login`, loginData, verifyToken);
      setRefreshToken(cookieName, data.refreshToekn);
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
      const { data } = await axios.put(`${http}/my/update-user`, userData);
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
      const { data } = await axios.get(`${http}/logout`, {crossDomain: true});
      return data;
    } catch (err) {
      console.log(err);
    }
  }
)