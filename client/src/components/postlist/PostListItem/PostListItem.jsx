import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostListItemPresenter from './PostListItem.style';

function PostListItem({ postData }) {
  const {
    meta,
    content,
    updateAt,
    hashtag,
    title,
    _id,
    owner: { nickname, imageUrl },
  } = postData;
  const navigate = useNavigate();
  const handleDetailPageMove = () => {
    navigate(`/post/view/${_id}`);
  };

  let length = [0, 0];
  for (let i = 0; i < hashtag.length; i++) {
    length[0] += hashtag[i].length;
    length[1] += 1;
    if (length > 10) {
      break;
    } else if (hashtag.length === 0) {
      break;
    }
  }

  const hashtagEdition = hashtag.slice(0, length[1] - 1);

  const date = new Date(updateAt);

  function getDate(data) {
    var _year = data.getFullYear();
    var _month = data.getMonth() + 1;
    var _day = data.getDate();
    return `${_year}년 ${_month}월 ${_day}일`;
  }
  const postDate = getDate(date);

  return (
    <PostListItemPresenter
      handleDetailPageMove={handleDetailPageMove}
      hashtag={hashtagEdition}
      content={content}
      meta={meta}
      postDate={postDate}
      title={title}
      writer={nickname}
      imgUrl={imageUrl}
      id={_id}
    />
  );
}

export default PostListItem;
