import { TAG_ADD, TAG_DELETE, TITLE_ADD, CONTENT_ADD, TARGETAGE_ADD, POST_RESET } from './type';

export const titleAdd = (title) => {
  return {
    type: TITLE_ADD,
    payload: {
      title: title,
    },
  };
};

export const contentAdd = (content) => {
  return {
    type: CONTENT_ADD,
    payload: {
      content: content,
    },
  };
};

export const targetAgeAdd = (targetAge) => {
  return {
    type: TARGETAGE_ADD,
    payload: {
      targetAge: targetAge,
    },
  };
};

export const tagAdd = (hashtag) => {
  return {
    type: TAG_ADD,
    payload: {
      hashtag: hashtag,
    },
  };
};

export const tagDelete = (hashtag) => {
  return {
    type: TAG_DELETE,
    payload: {
      hashtag: hashtag,
    },
  };
};

export const postReset = () => {
  return {
    type: POST_RESET,
  };
};
