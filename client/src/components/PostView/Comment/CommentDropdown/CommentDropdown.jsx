import React from 'react';
import { useDispatch } from 'react-redux';
import { getCommentId } from '../../../../redux/slice/commentDataSlice';
import { commentModalToggle } from '../../../../redux/slice/toggleSlice';
import CommentDropdownPresenter from './CommentDropdown.style';

function Dropdown({ handleClickShow, writer, commentId }, ref) {
  const dispatch = useDispatch();

  const handleCommentEdit = (e) => {
    e.preventDefault();
    handleClickShow(true);
  };
  const handleCommentDel = (e) => {
    e.preventDefault();
    dispatch(getCommentId(commentId));
    dispatch(commentModalToggle());
  };
  return (
    <CommentDropdownPresenter
      forwardRef={ref}
      handleCommentEdit={handleCommentEdit}
      handleCommentDel={handleCommentDel}
      writer={writer}
    />
  );
}
export const CommentDropdown = React.forwardRef(Dropdown);
