import React from 'react';
import { useDispatch } from 'react-redux';
import { getDeleteCommentId, getPinnedCommentId } from '../../../../redux/slice/commentSlice';
import { commentModalToggle } from '../../../../redux/slice/toggleSlice';
import CommentDropdownPresenter from './CommentDropdown.style';

function Dropdown({ handleClickShow, writer, commentId, parentId }, ref) {
  const dispatch = useDispatch();

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
  return (
    <CommentDropdownPresenter
      forwardRef={ref}
      handleCommentEdit={handleCommentEdit}
      handleCommentDel={handleCommentDel}
      handleCommentPinned={handleCommentPinned}
      writer={writer}
      parentId={parentId}
    />
  );
}
export const CommentDropdown = React.forwardRef(Dropdown);
