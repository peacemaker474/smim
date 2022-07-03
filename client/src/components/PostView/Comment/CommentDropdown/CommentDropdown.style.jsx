import React from 'react';
import styled from 'styled-components';
import {
  DropdownContainer,
  DropdownBox,
  DropdownItemBtn,
} from '../../../../styles/common/dropdown';
import { useSelector } from 'react-redux';

export default function CommentDropdownPresenter({
  forwardRef,
  handleCommentEdit,
  handleCommentDel,
  handleCommentPinned,
  writer,
  parentId,
}) {
  const userNickname = useSelector((state) => state.user).name;
  const postWriter = useSelector((state) => state.post).postWriter;

  return (
    <CommentDropdownContainer ref={forwardRef}>
      <CommentDropdownBox>
        {userNickname === postWriter && !parentId ? (
          <CommentDropdownBtn onClick={handleCommentPinned}>댓글고정</CommentDropdownBtn>
        ) : null}
        {userNickname === writer ? (
          <>
            <CommentDropdownBtn onClick={handleCommentEdit}>수정</CommentDropdownBtn>
            <CommentDropdownBtn onClick={handleCommentDel}>삭제</CommentDropdownBtn>
          </>
        ) : (
          <CommentDropdownBtn onClick={handleCommentEdit}>신고</CommentDropdownBtn>
        )}
      </CommentDropdownBox>
    </CommentDropdownContainer>
  );
}

const CommentDropdownContainer = styled(DropdownContainer)``;

const CommentDropdownBox = styled(DropdownBox)``;

const CommentDropdownBtn = styled(DropdownItemBtn)``;
