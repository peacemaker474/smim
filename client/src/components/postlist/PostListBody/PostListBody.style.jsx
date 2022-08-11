import React from 'react';
import PostListItem from '../PostListItem/PostListItem';

export default function PostListBodyPresenter({ postData }) {
  return (
    <>
      {postData.map((el) => (
        <PostListItem key={el._id} postData={el} />
      ))}
    </>
  );
}
