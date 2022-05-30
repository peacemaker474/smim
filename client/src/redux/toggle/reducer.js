import { MENU_OPEN, MENU_CLOSE, LOGIN_OPEN, LOGIN_CLOSE, INPUT_SHOW } from './type';

const initialState = {
  menuToggled: false,
  loginToggled: false,
  inputToggled: false,
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
      };
    case INPUT_SHOW:
      return {
        ...state,
        inputToggled: action.payload.inputToggled,
      };

    default:
      return state;
  }
}
