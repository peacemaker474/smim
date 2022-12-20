import { createSlice } from '@reduxjs/toolkit';

const initialToggleState = {
  menuToggled: false,
  loginToggled: false,
  inputToggled: false,
  modalToggled: false,
  postToggled: false,
  commentToggled: false,
  imageToggled: false,
  isLoginCheckToggled: false,
};

const toggleSlice = createSlice({
  name: 'toggle',
  initialState: initialToggleState,
  reducers: {
    menuToggle(state) {
      state.menuToggled = !state.menuToggled;
    },
    loginToggle(state) {
      state.loginToggled = !state.loginToggled;
    },
    inputToggle(state) {
      state.inputToggled = !state.inputToggled;
    },
    modalToggle(state) {
      state.modalToggled = !state.modalToggled;
    },
    isLoginCheckToggle(state) {
      state.isLoginCheckToggled = !state.isLoginCheckToggled;
    },
    postToggle(state) {
      state.postToggled = !state.postToggled;
    },
    commentModalToggle(state) {
      state.commentToggled = !state.commentToggled;
    },
    userImageToggle(state) {
      state.imageToggled = !state.imageToggled;
    },
  },
});

export const {
  loginToggle,
  menuToggle,
  inputToggle,
  modalToggle,
  postToggle,
  commentModalToggle,
  userImageToggle,
  isLoginCheckToggle,
} = toggleSlice.actions;

export default toggleSlice;
