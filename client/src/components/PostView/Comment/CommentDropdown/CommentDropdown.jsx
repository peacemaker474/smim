import React from 'react';
import CommentDropdownPresenter from './CommentDropdown.style';

function Dropdown({ handleClickShow, writer }, ref) {
  const handleCommentEdit = (e) => {
    e.preventDefault();
    handleClickShow(true);
  };
  const handleCommentDel = (e) => {
    e.preventDefault();
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
