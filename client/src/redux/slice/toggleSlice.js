import { createSlice } from "@reduxjs/toolkit";

const initialToggleState = {
  menuToggled: false,
  loginToggled: false,
  inputToggled: false,
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
    }
  }
});

export const loginToggle = toggleSlice.actions.loginToggle;
export const menuToggle = toggleSlice.actions.menuToggle;
export const inputToggle = toggleSlice.actions.inputToggle;

export default toggleSlice;