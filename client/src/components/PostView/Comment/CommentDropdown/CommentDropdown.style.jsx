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
  const userNickname = useSelector((state) => state.user).name;
  const postWriter = useSelector((state) => state.post).postWriter;

  return (
    <CommentDropdownWrraper ref={forwardRef}>
      <CommentDropdownLists>
        {userNickname === postWriter && !parentId && commentId === pinnedId ? (
          <CommentDropdownList onClick={handleCommentUnpinned}>고정해제</CommentDropdownList>
        ) : userNickname === postWriter && !parentId ? (
          <CommentDropdownList onClick={handleCommentPinned}>고정</CommentDropdownList>
        ) : null}
        {userNickname === writer ? (
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
  line-height: 38px;
`;
