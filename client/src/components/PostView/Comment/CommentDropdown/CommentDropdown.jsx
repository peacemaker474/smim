import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDeleteCommentId,
  getPinnedCommentId,
  getUnpinnedCommentId,
} from '../../../../redux/slice/commentSlice';
import { commentModalToggle, isLoginCheckToggle } from '../../../../redux/slice/toggleSlice';
import CommentDropdownPresenter from './CommentDropdown.style';

function Dropdown({ onClickShow, writer, commentId, parentId }, ref) {
  const dispatch = useDispatch();
  const { pinnedId } = useSelector((state) => state.comment);
  const { accessToken } = useSelector((state) => state.authToken);
  const { name } = useSelector((state) => state.user);
  const { postWriter } = useSelector((state) => state.post);

  const handleCommentEdit = useCallback(
    (e) => {
      e.preventDefault();
      onClickShow(true);
    },
    [onClickShow]
  );

  const handleCommentDel = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(getDeleteCommentId(commentId));
      dispatch(commentModalToggle());
    },
    [dispatch, commentId]
  );

  const handleCommentPinned = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(getPinnedCommentId(commentId));
      dispatch(commentModalToggle());
    },
    [dispatch, commentId]
  );

  const handleCommentUnpinned = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(getUnpinnedCommentId(commentId));
      dispatch(commentModalToggle());
    },
    [dispatch, commentId]
  );

  const handleCommentDeclaration = useCallback(() => {
    if (!accessToken) {
      dispatch(isLoginCheckToggle());
    }
  }, [accessToken, dispatch]);

  return (
    <CommentDropdownPresenter
      forwardRef={ref}
      onCommentEdit={handleCommentEdit}
      onCommentDel={handleCommentDel}
      onCommentPinned={handleCommentPinned}
      onCommentUnpinned={handleCommentUnpinned}
      onCommentDeclaration={handleCommentDeclaration}
      writer={writer}
      parentId={parentId}
      commentId={commentId}
      pinnedId={pinnedId}
      name={name}
      postWriter={postWriter}
    />
  );
}
export const CommentDropdown = React.forwardRef(Dropdown);
