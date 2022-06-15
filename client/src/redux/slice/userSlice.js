import { createSlice } from "@reduxjs/toolkit";
import { 
  getUserLogOut,
  postUserLogin,
  putUpdateUser,
  putUserImage
} from "../services/UserService";

const initialLoginState = {
  isLogin: false,
  message: "",
  id: "",
  name: "",
  email: "",
  social: false,
  imgUrl: "",
  success: false,
};

const userSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  extraReducers: (builder) => {
    builder
      .addCase(postUserLogin.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isLogin: payload.success,
          id: payload.id,
          name: payload.name,
          email: payload.email,
          social: payload.social,
          imgUrl: payload.imageUrl,
          message: payload.message,
        }
      })
      .addCase(postUserLogin.rejected, (state, { payload }) => {
        return {
          ...state,
          isLogin: payload.success,
          message: payload.message,
        }
      })
      .addCase(getUserLogOut.fulfilled, () => {
        return initialLoginState;
      })
      .addCase(putUpdateUser.fulfilled, (state, { payload }) => {
        return {
          ...state,
          id: payload.id,
          name: payload.name,
          email: payload.email,
          message: payload.message,
          imgUrl: payload.imageUrl,
          success: payload.success
        }
      })
      .addCase(putUpdateUser.rejected, (state, { payload }) => {
        return {
          ...state,
          success: payload.success,
          message: payload.message
        }
      })
      .addCase(putUserImage.fulfilled, (state, { payload }) => {
        return {
          ...state,
          imgUrl: payload.imageUrl
        }
      })
  }
});

export default userSlice;