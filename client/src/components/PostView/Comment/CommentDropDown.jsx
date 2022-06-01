import React from 'react';
import styled from 'styled-components';
import { DropdownContainer, DropdownBox, DropdownItemBtn } from '../../../styles/common/dropdown';

function Dropdown({ setIsEditing }, ref) {
  const handleCommentEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };
  const handleCommentDel = (e) => {
    e.preventDefault();
  };
  return (
    <CommentDropdownContainer ref={ref}>
      <CommentDropdownBox>
        <CommentDropdownBtn onClick={handleCommentEdit}>수정</CommentDropdownBtn>
        <CommentDropdownBtn onClick={handleCommentDel}>삭제</CommentDropdownBtn>
      </CommentDropdownBox>
    </CommentDropdownContainer>
  );
}
export const CommentDropdown = React.forwardRef(Dropdown);

const CommentDropdownContainer = styled(DropdownContainer)``;

const CommentDropdownBox = styled(DropdownBox)``;

const CommentDropdownBtn = styled(DropdownItemBtn)``;
