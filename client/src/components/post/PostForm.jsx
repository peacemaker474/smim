import React from 'react';
import PostTargetAge from './PostTargetAge';
import Posteditor from './posteditor';
import PostTitle from './PostTitle';
import PostTag from './PostTag';

function PostForm() {
  return (
    <form id='upload'>
      <PostTitle />
      <PostTargetAge />
      <PostTag />
      <Posteditor />
    </form>
  );
}
export default PostForm;
