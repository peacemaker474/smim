import { MENU_OPEN, MENU_CLOSE, LOGIN_OPEN, LOGIN_CLOSE } from "./type";

const initialState = {
  menuToggled: false,
  loginToggled: false,
};

export default function toggleReducer(state = initialState, action) {
  switch (action.type) {
    case MENU_OPEN:
      return {
        ...state,
        menuToggled: action.payload.menuToggled,
      };
    case MENU_CLOSE:
      return {
        ...state,
        menuToggled: action.payload.menuToggled,
      };
    case LOGIN_OPEN:
      return {
        ...state,
        loginToggled: action.payload.loginToggled,
      };
    case LOGIN_CLOSE:
      return {
        ...state,
        loginToggled: action.payload.loginToggled,
      }
    default:
      return state;
  }
}