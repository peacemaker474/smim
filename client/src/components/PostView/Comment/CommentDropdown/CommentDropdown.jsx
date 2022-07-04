import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDeleteCommentId,
  getPinnedCommentId,
  getUnpinnedCommentId,
} from '../../../../redux/slice/commentSlice';
import { commentModalToggle } from '../../../../redux/slice/toggleSlice';
import CommentDropdownPresenter from './CommentDropdown.style';

function Dropdown({ handleClickShow, writer, commentId, parentId }, ref) {
  const dispatch = useDispatch();

  const pinnedCommentId = useSelector((state) => state.comment).pinnedId;

  const handleCommentEdit = (e) => {
    e.preventDefault();
    handleClickShow(true);
  };
  const handleCommentDel = (e) => {
    e.preventDefault();
    dispatch(getDeleteCommentId(commentId));
    dispatch(commentModalToggle());
  };

  const handleCommentPinned = (e) => {
    e.preventDefault();
    dispatch(getPinnedCommentId(commentId));
    dispatch(commentModalToggle());
  };

  const handleCommentUnpinned = (e) => {
    e.preventDefault();
    dispatch(getUnpinnedCommentId(commentId));
    dispatch(commentModalToggle());
  };
  return (
    <CommentDropdownPresenter
      forwardRef={ref}
      handleCommentEdit={handleCommentEdit}
      handleCommentDel={handleCommentDel}
      handleCommentPinned={handleCommentPinned}
      handleCommentUnpinned={handleCommentUnpinned}
      writer={writer}
      parentId={parentId}
      commentId={commentId}
      pinnedId={pinnedCommentId}
    />
  );
}
export const CommentDropdown = React.forwardRef(Dropdown);
