import React from 'react';
import PostListItemPresenter from './PostListItem.style';
import getDate from '../../../utils/changedDate';
import getHashtagList from '../../../utils/limitedHashtag';
import checkedText from '../../../utils/checkedText';

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

  let paraContent = checkedText(content);
  const hashtagEdition = getHashtagList(hashtag);
  const postDate = getDate(updateAt);

  return (
    <PostListItemPresenter
      hashtag={hashtagEdition}
      content={paraContent}
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
