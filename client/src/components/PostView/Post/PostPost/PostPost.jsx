import React from 'react';
import PostPostPresenter from './PostPost.style';

function PostPost({ postDetail, postId, date, user }) {
  return (
    <PostPostPresenter
      postDetail={postDetail}
      postId={postId}
      date={date}
      user={user}
    />
  );
}

export default PostPost;
