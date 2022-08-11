import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostCommentPresenter from './PostComment.style';
import {
  deleteComment,
  getCommentPinned,
  getCommentUnpinned,
} from '../../../../network/comment/http';
import { commentModalToggle } from '../../../../redux/slice/toggleSlice';
import { deleteCommentId, unpinnedCommentId } from '../../../../redux/slice/commentSlice';
import { getPinnedCommentData } from '../../../../redux/services/comment';
import { getCookie } from '../../../../utils/cookie';

function PostComment() {
  const commentModalVisible = useSelector((state) => state.toggle).commentToggled;
  const tkn = useSelector((state) => state.authToken).accessToken;
  const tknAnother = getCookie();
  const dispatch = useDispatch();
  const commentId = useSelector((state) => state.comment).commentId;
  const modalState = useSelector((state) => state.comment).check;
  const { id: postId } = useParams();

  const handleCommentDelete = async () => {
    await deleteComment(commentId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tkn}`,
      },
    });
    dispatch(deleteCommentId(commentId));
    dispatch(commentModalToggle());
  };

  const hadnelCommentPinned = async () => {
    await getCommentPinned(commentId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tkn}`,
      },
    });
    dispatch(getPinnedCommentData({ pinnedId: commentId, tknAnother }));
    dispatch(commentModalToggle());
  };

  const handleCommentUnpinned = async () => {
    await getCommentUnpinned(commentId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tkn}`,
      },
    });
    dispatch(unpinnedCommentId());
    dispatch(commentModalToggle());
  };

  const cancelFunc = () => {
    dispatch(commentModalToggle());
  };

  return (
    <>
      <PostCommentPresenter
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
            ? '댓글을 완전히 삭제하시겠습니까?'
            : modalState === 'pinned'
            ? '이 댓글을 고정하시겠습니까?\n이미 고정한 댓글이 있으면\n이 댓글로 바뀝니다.'
            : '고정 댓글을 해제하시겠습니까? '
        }
        postId={postId}
      />
    </>
  );
}
export default PostComment;
