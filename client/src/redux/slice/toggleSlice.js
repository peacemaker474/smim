import { createSlice } from '@reduxjs/toolkit';

const initialToggleState = {
  menuToggled: false,
  loginToggled: false,
  inputToggled: false,
  modalToggled: false,
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
    modalToggle: {
      reducer(state, action) {
        state.modalToggled = action.payload.modal;
      },
      prepare(modal) {
        return {
          payload: {
            modal,
          },
        };
      },
    },
  },
});

export const loginToggle = toggleSlice.actions.loginToggle;
export const menuToggle = toggleSlice.actions.menuToggle;
export const inputToggle = toggleSlice.actions.inputToggle;
export const modalToggle = toggleSlice.actions.modalToggle;

export default toggleSlice;
