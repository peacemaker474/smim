import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostCommentPresenter from './PostComment.style';
import { deleteComment } from '../../../../network/comment/http';
import { commentModalToggle } from '../../../../redux/slice/toggleSlice';
import { resetCommentId } from '../../../../redux/slice/commentDataSlice';

export default function PostComment({ postId }) {
  const commentModalVisible = useSelector((state) => state.toggle).commentToggled;
  const tkn = useSelector((state) => state.authToken).accessToken;
  const dispatch = useDispatch();
  const commentId = useSelector((state) => state.comment).commentId;

  const handleCommentDelete = async () => {
    const response = await deleteComment(commentId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tkn}`,
      },
    });
    console.log(response.data);

    dispatch(resetCommentId());
    dispatch(commentModalToggle());
  };

  const cancelFunc = () => {
    dispatch(commentModalToggle());
  };

  return (
    <>
      <PostCommentPresenter
        postId={postId}
        handleCommentDelete={handleCommentDelete}
        commentModalVisible={commentModalVisible}
        cancelFunc={cancelFunc}
      />
    </>
  );
}
