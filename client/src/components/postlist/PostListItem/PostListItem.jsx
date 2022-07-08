import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostListItemPresenter from './PostListItem.style';

function PostListItem({ postData }) {
  const { meta, content, createAt, hashtag, title, _id } = postData;
  const navigate = useNavigate();
  const handleDetailPageMove = () => {
    navigate(`/post/view/${_id}`);
  };
  // const text = new TextDecoder('UTF-8').decode(content);

  const date = new Date(createAt);
  const postDate = date.toLocaleDateString();

  return (
    <PostListItemPresenter
      handleDetailPageMove={handleDetailPageMove}
      hashtag={hashtag}
      content={content}
      meta={meta}
      postDate={postDate}
      title={title}
    />
  );
}

export default PostListItem;
