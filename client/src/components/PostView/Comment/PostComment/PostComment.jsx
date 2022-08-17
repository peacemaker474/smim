import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
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
  const { commentToggled } = useSelector((state) => state.toggle);
  const { accessToken } = useSelector((state) => state.authToken);

  const { commentId, check, pinnedId } = useSelector(
    (state) => ({
      commentId: state.comment.commentId,
      pinnedId: state.comment.pinnedId,
      check: state.comment.check,
    }),
    shallowEqual
  );
  const tkn = getCookie();
  const dispatch = useDispatch();
  const { id: postId } = useParams();

  const handleCommentDelete = async () => {
    if (commentId === pinnedId) {
      await getCommentUnpinned(commentId, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(unpinnedCommentId());
    }
    await deleteComment(commentId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(deleteCommentId(commentId));

    dispatch(commentModalToggle());
  };

  const handleCommentPinned = async () => {
    await getCommentPinned(commentId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(getPinnedCommentData({ pinnedId: commentId, tkn }));
    dispatch(commentModalToggle());
  };

  const handleCommentUnpinned = async () => {
    await getCommentUnpinned(commentId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
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
          check === 'delete'
            ? handleCommentDelete
            : check === 'pinned'
            ? handleCommentPinned
            : handleCommentUnpinned
        }
        commentToggled={commentToggled}
        cancelFunc={cancelFunc}
        modalText={
          check === 'delete'
            ? '댓글을 완전히 삭제하시겠습니까?'
            : check === 'pinned'
            ? '이 댓글을 고정하시겠습니까?\n이미 고정한 댓글이 있으면\n이 댓글로 바뀝니다.'
            : '고정 댓글을 해제하시겠습니까? '
        }
        postId={postId}
      />
    </>
  );
}
export default PostComment;
