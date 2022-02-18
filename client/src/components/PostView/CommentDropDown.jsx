import React from 'react';
import styled from 'styled-components';

function DropDown({ handleDropDownShow }, ref) {
  const handleCommentEdit = (e) => {
    e.preventDefault();
    console.log('edit');
    // handleDropDownShow();
  };
  const handleCommentDel = (e) => {
    e.preventDefault();

    console.log('del');
    // handleDropDownShow();
  };
  return (
    <DropDownContainer ref={ref}>
      <DropDownBox>
        <DropDownBtn onClick={handleCommentEdit}>수정</DropDownBtn>
        <DropDownBtn onClick={handleCommentDel}>삭제</DropDownBtn>
      </DropDownBox>
    </DropDownContainer>
  );
}
export const CommentDropDown = React.forwardRef(DropDown);

const DropDownContainer = styled.div`
  width: 72px;
  height: 72px;
  background: #ffffff;
  filter: drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.25));
  position: absolute;
  top: 31px;
  right: -18px;
  z-index: 2;
  border-radius: 10px;
`;

const DropDownBox = styled.div`
  padding: 5px;
  & button + button {
    margin-top: 8px;
  }
`;

const DropDownBtn = styled.button`
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  &:hover {
    border: 1px solid #000000;
    color: #000000;
  }
`;
