import React from 'react';
import styled from 'styled-components';
import { DropdownWrraper, DropdownLists, DropdownList } from '../../../../styles/common/dropdown';

export default function CommentDropdownPresenter({
  forwardRef,
  onCommentEdit,
  onCommentDel,
  onCommentPinned,
  onCommentUnpinned,
  onCommentDeclaration,
  writer,
  parentId,
  commentId,
  pinnedId,
  name,
  postWriter,
}) {
  return (
    <CommentDropdownWrraper ref={forwardRef}>
      <CommentDropdownLists>
        {name === postWriter && !parentId && commentId === pinnedId ? (
          <CommentDropdownList onClick={onCommentUnpinned}>고정해제</CommentDropdownList>
        ) : name === postWriter && !parentId ? (
          <CommentDropdownList onClick={onCommentPinned}>고정</CommentDropdownList>
        ) : null}
        {name === writer ? (
          <>
            <CommentDropdownList onClick={onCommentEdit}>수정</CommentDropdownList>
            <CommentDropdownList onClick={onCommentDel}>삭제</CommentDropdownList>
          </>
        ) : (
          <CommentDropdownList onClick={onCommentDeclaration}>신고</CommentDropdownList>
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
