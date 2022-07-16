import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentUnlike, getCommentLike } from '../../../../network/comment/http';
import CommentLikeBtnPresenter from './CommentLikeBtn.style';
import { isLoginCheckToggle } from '../../../../redux/slice/toggleSlice';

function CommentLikeBtn({ cmntData }) {
  const [like, setLike] = useState(cmntData.like);
  const [likeCount, setLikeCount] = useState(cmntData.like_count);
  const tkn = useSelector((state) => state.authToken).accessToken;
  const dispatch = useDispatch();

  const handleCommentLike = () => {
    if (!tkn) {
      dispatch(isLoginCheckToggle());
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
    <CommentLikeBtnPresenter
      handleCommentLike={handleCommentLike}
      like={like}
      likeCount={likeCount}
    />
  );
}

export default CommentLikeBtn;
