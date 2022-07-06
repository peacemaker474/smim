import React from 'react';
import PostTitlePresenter from './PostTitle.style';

function PostTitle({ register, errors }) {
  return <PostTitlePresenter register={register} errors={errors} />;
}

export default PostTitle;
