import React from 'react';
import styled from 'styled-components';
import {
  DropdownBox,
  DropdownContainer,
  DropdownItemBtn,
} from '../../../../styles/common/dropdown';

function Dropdown({ handlePostEdit, handlePostDel }, ref) {
  return (
    <PostDropdownContainer ref={ref}>
      <PostDropdownBox>
        <PostDropdownBtn onClick={handlePostEdit}>수정</PostDropdownBtn>
        <PostDropdownBtn onClick={handlePostDel}>삭제</PostDropdownBtn>
      </PostDropdownBox>
    </PostDropdownContainer>
  );
}
export const PostDropdownPresenter = React.forwardRef(Dropdown);

const PostDropdownContainer = styled(DropdownContainer)`
  height: auto;
`;

const PostDropdownBox = styled(DropdownBox)``;

const PostDropdownBtn = styled(DropdownItemBtn)``;
