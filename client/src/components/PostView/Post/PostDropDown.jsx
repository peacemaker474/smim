import React from 'react';
import styled from 'styled-components';
import { DropDownBox, DropDownContainer, DropDownItemBtn } from '../../../styles/common/dropdown';

function DropDown(props, ref) {
  const handlePostEdit = (e) => {
    e.preventDefault();
    console.log('수정');
  };
  const handlePostDel = (e) => {
    e.preventDefault();
    console.log('삭제');
  };
  return (
    <PostDropDownContainer ref={ref}>
      <PostDropDownBox>
        <PostDropDownBtn onClick={handlePostDel}>삭제</PostDropDownBtn>
        <PostDropDownBtn onClick={handlePostEdit}>수정</PostDropDownBtn>
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
