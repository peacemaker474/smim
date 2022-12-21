import { useAppDispatch, useAppSelectorTyped } from '../redux/hooks';
import { commentModalToggle } from '../redux/slice/toggleSlice';
import { initPinnedComment, deleteCommentId } from '../redux/slice/commentSlice';
import { getPinnedCommentData } from '../redux/services/comment';
import { getCommentUnpinned, deleteComment, getCommentPinned } from '../networks/comment/http';

function useCmntModal() {
  const { commentId, check, pinnedId, accessToken } = useAppSelectorTyped((state) => ({
    commentId: state.comment.commentId,
    check: state.comment.check,
    pinnedId: state.comment.pinnedId,
    accessToken: state.auth.accessToken,
  }));
  const dispatch = useAppDispatch();

  let modalText = '';

  if (check === 'delete') {
    modalText = '댓글을 완전히 삭제하시겠습니까?';
  } else if (check === 'pinned') {
    modalText = '이 댓글을 고정하시겠습니까?\n이미 고정한 댓글이 있으면\n이 댓글로 바뀝니다.';
  } else {
    modalText = '고정 댓글을 해제하시겠습니까? ';
  }

  const handleCommentDelete = async () => {
    if (commentId === pinnedId) {
      await getCommentUnpinned(commentId, accessToken);
      dispatch(initPinnedComment());
    }
    await deleteComment(commentId, accessToken);
    dispatch(deleteCommentId(commentId));
    dispatch(commentModalToggle());
  };

  const handleCommentPinned = async () => {
    await getCommentPinned(commentId, accessToken);
    dispatch(getPinnedCommentData(commentId));
    dispatch(commentModalToggle());
  };

  const handleCommentUnpinned = async () => {
    await getCommentUnpinned(commentId, accessToken);
    dispatch(initPinnedComment());
    dispatch(commentModalToggle());
  };

  const cancelFunc = () => {
    dispatch(commentModalToggle());
  };

  const actionFunc = () => {
    if (check === 'delete') {
      handleCommentDelete();
    } else if (check === 'pinned') {
      handleCommentPinned();
    } else {
      handleCommentUnpinned();
    }
  };

  return [cancelFunc, actionFunc, modalText] as const;
}

export default useCmntModal;
