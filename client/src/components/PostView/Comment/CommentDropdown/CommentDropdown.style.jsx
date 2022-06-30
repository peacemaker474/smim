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
  writer,
}) {
  const userNickname = useSelector((state) => state.user).name;

  return (
    <CommentDropdownContainer ref={forwardRef}>
      <CommentDropdownBox>
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
