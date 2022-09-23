import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoginCheckToggle } from '../../../../redux/slice/toggleSlice';
import { getCommentUnlike, getCommentLike } from '../../../../network/comment/http';
import CommentLikeBtnPresenter from './CommentLikeBtn.style';

function CommentLikeBtn({ cmntData }) {
  const [like, setLike] = useState(cmntData.like);
  const [likeCount, setLikeCount] = useState(cmntData.like_count);
  const { accessToken } = useSelector((state) => state.authToken);
  const dispatch = useDispatch();

  const handleCommentLike = () => {
    if (!accessToken) {
      return dispatch(isLoginCheckToggle());
    }

    if (like) {
      getCommentUnlike(cmntData._id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setLikeCount(likeCount - 1);
    } else {
      getCommentLike(cmntData._id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setLikeCount(likeCount + 1);
    }
    setLike(!like);
  };
  return (
    <CommentLikeBtnPresenter 
      onCommentLike={handleCommentLike} 
      like={like}
      likeCount={likeCount}
    />
  );
}

export default CommentLikeBtn;
