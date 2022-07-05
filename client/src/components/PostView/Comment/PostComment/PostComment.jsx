import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostCommentPresenter from './PostComment.style';
import {
  deleteComment,
  getCommentPinned,
  getCommentUnpinned,
} from '../../../../network/comment/http';
import { commentModalToggle } from '../../../../redux/slice/toggleSlice';
import {
  deleteCommentId,
  pinnedCommentId,
  unpinnedCommentId,
} from '../../../../redux/slice/commentSlice';

export default function PostComment({ postId }) {
  const commentModalVisible = useSelector((state) => state.toggle).commentToggled;
  const tkn = useSelector((state) => state.authToken).accessToken;
  const dispatch = useDispatch();
  const commentId = useSelector((state) => state.comment).commentId;
  const modalState = useSelector((state) => state.comment).check;

  const handleCommentDelete = async () => {
    const response = await deleteComment(commentId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tkn}`,
      },
    });
    console.log(response.data);

    dispatch(deleteCommentId(commentId));
    dispatch(commentModalToggle());
  };

  const hadnelCommentPinned = async () => {
    const response = await getCommentPinned(commentId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tkn}`,
      },
    });
    console.log(response.data);
    dispatch(pinnedCommentId(commentId));
    dispatch(commentModalToggle());
  };

  const handleCommentUnpinned = async () => {
    const response = await getCommentUnpinned(commentId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tkn}`,
      },
    });
    console.log(response.data);
    dispatch(unpinnedCommentId());
    dispatch(commentModalToggle());
  };

  const cancelFunc = () => {
    dispatch(commentModalToggle());
  };

  return (
    <>
      <PostCommentPresenter
        postId={postId}
        actionFunc={
          modalState === 'delete'
            ? handleCommentDelete
            : modalState === 'pinned'
            ? hadnelCommentPinned
            : handleCommentUnpinned
        }
        commentModalVisible={commentModalVisible}
        cancelFunc={cancelFunc}
        modalText={
          modalState === 'delete'
            ? '댓글을 삭제하시겠습니까?'
            : modalState === 'pinned'
            ? '이 댓글을 고정하시겠습니까?이미 고정한 댓글이 있으면 이 댓글로 바뀝니다.'
            : '고정 댓글을 해제하시겠습니까? '
        }
      />
    </>
  );
}
