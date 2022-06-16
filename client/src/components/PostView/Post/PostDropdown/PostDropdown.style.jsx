import React from 'react';
import styled from 'styled-components';
import {
  DropdownBox,
  DropdownContainer,
  DropdownItemBtn,
} from '../../../../styles/common/dropdown';

export default function PostDropdownPresenter({ forwardRef, handlePostEdit, handlePostDel }) {
  return (
    <PostDropdownContainer ref={forwardRef}>
      <PostDropdownBox>
        <PostDropdownBtn onClick={handlePostEdit}>수정</PostDropdownBtn>
        <PostDropdownBtn onClick={handlePostDel}>삭제</PostDropdownBtn>
      </PostDropdownBox>
    </PostDropdownContainer>
  );
}

const PostDropdownContainer = styled(DropdownContainer)`
  height: auto;
`;

const PostDropdownBox = styled(DropdownBox)``;

const PostDropdownBtn = styled(DropdownItemBtn)``;
