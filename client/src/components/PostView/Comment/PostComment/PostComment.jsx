import React from 'react';
import PostCommentPresenter from './PostComment.style';

export default function PostComment({ postId }) {
  return <PostCommentPresenter postId={postId} />;
}
