import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const http = process.env.REACT_APP_SERVER_URL;

interface IUserError {
  errorMessage: string;
}

interface IUserLogin {
  id: string;
  name: string;
  email: string;
  accessToken: string;
  refreshToekn: string;
  success: boolean;
  imageUrl: string;
  message: string;
}

interface ILoginData {
  userId: string;
  password: string;
}

interface IMy {
  userId: string;
  nickename: string;
  email: string;
  accessToken: string;
}

interface IResponse {
  id: string;
    name: string;
    email: string;
    success: boolean;
    message: string;
}

interface IImage {
  imageData: FormData;
  accessToken: string;
}

interface IImageResponse {
  success: boolean;
      message: string;
      imageUrl: string;
}

export const postUserLogin = createAsyncThunk<IUserLogin[], ILoginData>(
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

export const putUpdateUser = createAsyncThunk<IResponse, IMy>(
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

export const putUserImage = createAsyncThunk<IImageResponse, IImage>(
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