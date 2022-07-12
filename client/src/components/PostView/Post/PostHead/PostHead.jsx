import React from 'react';
import { useSelector } from 'react-redux';
import PostHeadPresenter from './PostHead.style';

export default function PostHead({ author, date, postId }) {
  const loginState = useSelector((state) => state.user);
  const userId = loginState.id;

  const postDate = date.toLocaleDateString();

  return <PostHeadPresenter author={author} postId={postId} userId={userId} postDate={postDate} />;
}
