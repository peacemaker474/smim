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
  postId,
}) {
  return (
    <PostDropdownBtn ref={btnRef} onClick={handleDropdownShow}>
      {isDropdownVisible && <PostDropdown ref={dropdownRef} postId={postId} />}
    </PostDropdownBtn>
  );
}

const PostDropdownBtn = styled(DropdownBtn)`
  background: url(${moreIcon});
`;
