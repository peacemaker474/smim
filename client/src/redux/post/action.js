import { TAG_ADD, TAG_DELETE, TITLE_ADD, TARGETAGE_ADD,  } from './type';


export const titleAdd = (title) => {
  return {
    type: TITLE_ADD,
    payload: {
      title: title,
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

export const tagDelete = () => {
  return {
    type: TAG_DELETE,
    payload: {
      hashtag: '',
    },
  };
};
