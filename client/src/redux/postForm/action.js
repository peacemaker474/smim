import { TITLE_CHECK, AGE_CHECK, HASHTAG_CHECK, CONTENT_CHECK, RESET_CHECK } from './type';

export const titleCheck = () => {
  return {
    type: TITLE_CHECK,
    payload: {
      title: true,
      age: false,
      hashtag: false,
      content: false,
    },
  };
};
export const ageCheck = () => {
  return {
    type: AGE_CHECK,
    payload: {
      title: false,
      age: true,
      hashtag: false,
      content: false,
    },
  };
};
export const hashtagCheck = () => {
  return {
    type: HASHTAG_CHECK,
    payload: {
      title: false,
      age: false,
      hashtag: true,
      content: false,
    },
  };
};
export const contentCheck = () => {
  return {
    type: CONTENT_CHECK,
    payload: {
      title: false,
      age: false,
      hashtag: false,
      content: true,
    },
  };
};

export const resetCheck = () => {
  return {
    type: RESET_CHECK,
    payload: { title: false, age: false, hashtag: false, content: false },
  };
};
