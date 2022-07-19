import React from 'react';
import { useSelector } from 'react-redux';
import PostHeadPresenter from './PostHead.style';

export default function PostHead({ postDetail, date, view }) {
  const { owner: author } = postDetail;
  const postViews = view.views;

  const loginState = useSelector((state) => state.user);
  const userId = loginState.id;

  const postDate = date.toLocaleDateString();

  return (
    <PostHeadPresenter author={author} userId={userId} postDate={postDate} postViews={postViews} />
  );
}
