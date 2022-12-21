import { useCallback } from 'react';
import { useAppSelectorTyped, useAppDispatch } from '../redux/hooks';
import {
  getDeleteCommentId,
  getPinnedCommentId,
  getUnpinnedCommentId,
  getReportCommentId,
} from '../redux/slice/commentSlice';
import { commentModalToggle, isLoginCheckToggle, postToggle } from '../redux/slice/toggleSlice';

function useCmntDropdown(commentId: string) {
  const { pinnedId, accessToken } = useAppSelectorTyped((state) => ({
    pinnedId: state.comment.pinnedId,
    accessToken: state.auth.accessToken,
  }));
  const dispatch = useAppDispatch();
  const pinnedText = commentId === pinnedId ? '고정해제' : '고정';

  const handleCommentDel = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      e.preventDefault();
      dispatch(getDeleteCommentId(commentId));
      dispatch(commentModalToggle());
    },
    [dispatch, commentId],
  );

  const handleCommentPinned = (e: React.MouseEvent<HTMLLIElement>) => {
    if (commentId === pinnedId) {
      dispatch(getUnpinnedCommentId(commentId));
    } else {
      dispatch(getPinnedCommentId(commentId));
    }
    dispatch(commentModalToggle());
  };

  const handleCommentDeclaration = useCallback(() => {
    if (!accessToken) {
      dispatch(isLoginCheckToggle());
      return;
    }
    dispatch(getReportCommentId(commentId));
    dispatch(postToggle());
  }, [accessToken, dispatch, commentId]);

  return [pinnedText, handleCommentDel, handleCommentPinned, handleCommentDeclaration] as const;
}

export default useCmntDropdown;
