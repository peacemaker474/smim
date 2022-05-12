import { LOGIN_USER, LOGOUT_USER, SET_MESSAGE, UPDATE_USER } from "./type";

export default function loginReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isLogin: action.payload.success,
        message: action.payload.message,
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        social: action.payload.social,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLogin: false,
        message: '',
        id: "",
        name: "",
        email: "",
      };
    case UPDATE_USER:
      return {
        ...state,
        isLogin: action.payload.success,
        message: action.payload.message,
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        social: action.payload.social,
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: '',
      }
    default:
      return state;
  }
}