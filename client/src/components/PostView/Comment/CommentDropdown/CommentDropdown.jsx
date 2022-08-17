import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDeleteCommentId,
  getPinnedCommentId,
  getUnpinnedCommentId,
} from '../../../../redux/slice/commentSlice';
import { commentModalToggle } from '../../../../redux/slice/toggleSlice';
import CommentDropdownPresenter from './CommentDropdown.style';

function Dropdown({ onClickShow, writer, commentId, parentId }, ref) {
  const dispatch = useDispatch();
  const { pinnedId } = useSelector((state) => state.comment);

  const handleCommentEdit = (e) => {
    e.preventDefault();
    onClickShow(true);
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

  const handleCommentDeclaration = () => {};

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
    />
  );
}
export const CommentDropdown = React.forwardRef(Dropdown);
