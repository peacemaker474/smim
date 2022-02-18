import {MENU_OPEN, MENU_CLOSE, LOGIN_OPEN, LOGIN_CLOSE} from './type';

export const menuOpen = () => {
  return {
    type: MENU_OPEN,
    payload: {
      menuToggled: true,
    },
  };
};

export const menuClose = () => {
  return {
    type: MENU_CLOSE,
    payload: {
      menuToggled: false,
    }
  }
}

export const loginOpen = () => {
  return {
    type: LOGIN_OPEN,
    payload: {
      loginToggled: true,
    },
  };
}

export const loginClose = () => {
  return {
    type: LOGIN_CLOSE,
    payload: {
      loginToggled: false,
    },
  };
}