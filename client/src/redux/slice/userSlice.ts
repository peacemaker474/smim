import { createSlice } from "@reduxjs/toolkit";
import { 
  getUserLogOut,
  postUserLogin,
  putUpdateUser,
  putUserImage
} from "../services/UserService";

const initialLoginState = {
  message: "",
  id: "",
  name: "",
  email: "",
  imgUrl: "",
  success: false,
  loginCheck: false,
};

const userSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postUserLogin.fulfilled, (state, { payload }) => {
        return {
          ...state,
          id: payload.id,
          name: payload.name,
          email: payload.email,
          imgUrl: payload.imageUrl,
          message: payload.message,
          success: payload.success,
          loginCheck: true,
        }
      })
      .addCase(postUserLogin.rejected, (state, { payload }) => {
        if (payload) {
          return {
            ...state,
            success: payload.success,
            message: payload.message,
          };
        }
      })
      .addCase(getUserLogOut.fulfilled, () => {
        return initialLoginState;
      })
      .addCase(putUpdateUser.fulfilled, (state, { payload }) => {
        alert(payload.message);
        return {
          ...state,
          id: payload.id,
          name: payload.name,
          email: payload.email,
          message: payload.message,
          success: payload.success
        }
      })
      .addCase(putUpdateUser.rejected, (state, { payload }) => {
        if (payload) {
          return {
            ...state,
            success: payload.success,
            message: payload.message
          }
        }
      })
      .addCase(putUserImage.fulfilled, (state, { payload }) => {
        alert(payload.message);
        return {
          ...state,
          imgUrl: payload.imageUrl
        }
      })
      .addCase(putUserImage.rejected, (state, { payload }) => {
        if (payload) {
          alert(payload.message);
          window.location.replace("/my");
          return {
            ...state,
            success: payload.success,
            message: payload.message
          }
        }
      })
  }
});

export default userSlice;