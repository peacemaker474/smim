import React from 'react';
import CommentDropdownPresenter from './CommentDropdown.style';

function Dropdown({ setIsEditing }, ref) {
  const handleCommentEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };
  const handleCommentDel = (e) => {
    e.preventDefault();
  };
  return (
    <CommentDropdownPresenter
      ref={ref}
      handleCommentEdit={handleCommentEdit}
      handleCommentDel={handleCommentDel}
    />
  );
}
export const CommentDropdown = React.forwardRef(Dropdown);
