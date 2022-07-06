import { createSlice } from '@reduxjs/toolkit';

const initialToggleState = {
  menuToggled: false,
  loginToggled: false,
  inputToggled: false,
  modalToggled: false,
  commentToggled: false,
  imageToggled: false,
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
  commentModalToggle,
  userImageToggle,
} = toggleSlice.actions;

export default toggleSlice;
