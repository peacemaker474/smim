import React from 'react';
import PostPost from './Post/PostPost/PostPost';
import PostComment from './Comment/PostComment/PostComment';

function PostViewContent() {
  return (
    <>
      <PostPost setPostViewState={setPostViewState} />
      <PostComment />
    </>
  );
}

export default PostViewContent;
