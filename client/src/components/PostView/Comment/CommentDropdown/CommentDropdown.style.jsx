import React from 'react';
import styled from 'styled-components';
import { DropdownWrraper, DropdownLists, DropdownList } from '../../../../styles/common/dropdown';
import { useSelector } from 'react-redux';

export default function CommentDropdownPresenter({
  forwardRef,
  handleCommentEdit,
  handleCommentDel,
  handleCommentPinned,
  handleCommentUnpinned,
  handleCommentDeclaration,
  writer,
  parentId,
  commentId,
  pinnedId,
}) {
  const { name } = useSelector((state) => state.user);
  const { postWriter } = useSelector((state) => state.post);

  return (
    <CommentDropdownWrraper ref={forwardRef}>
      <CommentDropdownLists>
        {name === postWriter && !parentId && commentId === pinnedId ? (
          <CommentDropdownList onClick={handleCommentUnpinned}>고정해제</CommentDropdownList>
        ) : name === postWriter && !parentId ? (
          <CommentDropdownList onClick={handleCommentPinned}>고정</CommentDropdownList>
        ) : null}
        {name === writer ? (
          <>
            <CommentDropdownList onClick={handleCommentEdit}>수정</CommentDropdownList>
            <CommentDropdownList onClick={handleCommentDel}>삭제</CommentDropdownList>
          </>
        ) : (
          <CommentDropdownList onClick={handleCommentDeclaration}>신고</CommentDropdownList>
        )}
      </CommentDropdownLists>
    </CommentDropdownWrraper>
  );
}

const CommentDropdownWrraper = styled(DropdownWrraper)`
  width: 76px;
`;

const CommentDropdownLists = styled(DropdownLists)`
  font-size: 13px;
`;

const CommentDropdownList = styled(DropdownList)`
  line-height: 34px;
`;
