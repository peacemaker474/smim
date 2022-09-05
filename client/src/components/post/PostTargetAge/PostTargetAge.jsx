import React from 'react';
import PostTargetAgePresenter from './PostTargetAge.style';

function PostTargetAge({ register, errors }) {
  return (
    <PostTargetAgePresenter 
      register={register}
      errors={errors}
    />
  );
}

export default PostTargetAge;
