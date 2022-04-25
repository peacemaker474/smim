import { UPDATE_USER } from "./type";

export default function myPageReducer (state = {}, action) {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        message: action.payload.message,
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
      }
    default: 
      return state;
  }
}