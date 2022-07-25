import React from 'react';
import styled from 'styled-components';
import { DropdownBtn } from '../../../../styles/common/dropdown';
import { PostDropdown } from '../PostDropdown/PostDropdown';
import moreIcon from '../../../../asset/icon/icon-more-horizontal.svg';

export default function PostDropdownBtnPresenter({
  isDropdownVisible,
  dropdownRef,
  btnRef,
  handleDropdownShow,
}) {
  return (
    <PostDropdownBtnDiv ref={btnRef} onClick={handleDropdownShow}>
      <PostDropdownBtn></PostDropdownBtn>
      {isDropdownVisible && <PostDropdown ref={dropdownRef} />}
    </PostDropdownBtnDiv>
  );
}

const PostDropdownBtnDiv = styled.div`
  position: relative;
`;

const PostDropdownBtn = styled(DropdownBtn)`
  background: url(${moreIcon});
`;
