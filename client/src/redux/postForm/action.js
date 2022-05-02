import { TITLE_CHECK, AGE_CHECK, HASHTAG_CHECK, CONTENT_CHECK, RESET_CHECK } from './type';

export const titleCheck = () => {
  return {
    type: TITLE_CHECK,
    payload: {
      titleInput: true,
    },
  };
};
export const ageCheck = () => {
  return {
    type: AGE_CHECK,
    payload: {
      ageInput: true,
    },
  };
};
export const hashtagCheck = () => {
  return {
    type: HASHTAG_CHECK,
    payload: {
      hashtagInput: true,
    },
  };
};
export const contentCheck = () => {
  return {
    type: CONTENT_CHECK,
    payload: {
      contentInput: true,
    },
  };
};

export const resetCheck = () => {
  return {
    type: RESET_CHECK,
    payload: {},
  };
};
