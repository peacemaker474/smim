import React from 'react';
import PostTitle from '../PostTitle/PostTitle';
import PostTargetAge from '../PostTargetAge/PostTargetAge';
import PostTag from '../PostTag/PostTag';
import PostEditor from '../PostEditor/PostEditor';

function PostFormPresenter() {
  return (
    <form id='upload'>
      <PostTitle />
      <PostTargetAge />
      <PostTag />
      <PostEditor />
    </form>
  );
}
export default PostFormPresenter;
