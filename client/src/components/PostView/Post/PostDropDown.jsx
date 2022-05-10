import React from 'react';
import styled from 'styled-components';
import { DropDownBox, DropDownContainer, DropDownItemBtn } from '../../../styles/common/dropdown';

function DropDown({ setIsEditing }, ref) {
  const handlePostEdit = (e) => {
    e.preventDefault();
    console.log('신고');
  };
  const handlePostDel = (e) => {
    e.preventDefault();
    console.log('북마크');
  };
  return (
    <PostDropDownContainer ref={ref}>
      <PostDropDownBox>
        <PostDropDownBtn onClick={handlePostEdit}>신고</PostDropDownBtn>
        <PostDropDownBtn onClick={handlePostDel}>공유</PostDropDownBtn>
        <PostDropDownBtn onClick={handlePostDel}>삭제</PostDropDownBtn>
        <PostDropDownBtn onClick={handlePostDel}>수정</PostDropDownBtn>
      </PostDropDownBox>
    </PostDropDownContainer>
  );
}
export const PostDropDown = React.forwardRef(DropDown);

const PostDropDownContainer = styled(DropDownContainer)`
  height: auto;
`;

const PostDropDownBox = styled(DropDownBox)``;

const PostDropDownBtn = styled(DropDownItemBtn)``;
