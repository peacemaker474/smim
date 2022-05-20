import React from 'react';
import PostTitle from './PostTitle';
import PostTargetAge from './PostTargetAge';
import Posteditor from './posteditor';
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
