import React from 'react';
import styled from 'styled-components';
import { DropDownContainer, DropDownBox, DropDownItemBtn } from '../../../styles/common/dropdown';

function DropDown({ setIsEditing }, ref) {
  const handleCommentEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };
  const handleCommentDel = (e) => {
    e.preventDefault();
  };
  return (
    <CommentDropDownContainer ref={ref}>
      <CommentDropDownBox>
        <CommentDropDownBtn onClick={handleCommentEdit}>수정</CommentDropDownBtn>
        <CommentDropDownBtn onClick={handleCommentDel}>삭제</CommentDropDownBtn>
      </CommentDropDownBox>
    </CommentDropDownContainer>
  );
}
export const CommentDropDown = React.forwardRef(DropDown);

const CommentDropDownContainer = styled(DropDownContainer)``;

const CommentDropDownBox = styled(DropDownBox)``;

const CommentDropDownBtn = styled(DropDownItemBtn)``;
