import React, { useState } from 'react';
import useVisible from '../../../../hooks/useVisible';
import CommentItemEtcPresenter from './CommentItemEtc.style';
import { getCommentLike, getCommentUnlike } from '../../../../network/comment/http';
import { useDispatch, useSelector } from 'react-redux';
import { isLoginCheckToggle } from '../../../../redux/slice/toggleSlice';

export default function CommentItemEtc({ cmntData, groupId }) {
  const [isTargetVisible, handleClickShow] = useVisible(false);
  const [like, setLike] = useState(cmntData.like);
  const [likeCount, setLikeCount] = useState(cmntData.like_count);
  const tkn = useSelector((state) => state.authToken).accessToken;
  const dispatch = useDispatch();

  const handleClickCancel = () => {
    handleClickShow(!isTargetVisible);
  };

  const handleCommentLike = () => {
    if (!tkn) {
      dispatch(isLoginCheckToggle());
      console.log('check');
      return;
    }
    if (like) {
      getCommentUnlike(cmntData._id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tkn}`,
        },
      });

      setLikeCount(likeCount - 1);
    } else {
      getCommentLike(cmntData._id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tkn}`,
        },
      });
      setLikeCount(likeCount + 1);
    }
    setLike(!like);
  };

  return (
    <CommentItemEtcPresenter
      isTargetVisible={isTargetVisible}
      handleClickShow={handleClickShow}
      createAt={cmntData.createAt}
      likeCount={likeCount}
      groupId={groupId}
      postId={cmntData.post_id}
      parentId={cmntData._id}
      handleClickCancel={handleClickCancel}
      like={like}
      handleCommentLike={handleCommentLike}
      id={cmntData._id}
    />
  );
}
