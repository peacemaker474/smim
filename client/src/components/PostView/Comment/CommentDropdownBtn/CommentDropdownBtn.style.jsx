import React from 'react';
import styled from 'styled-components';
import { CommentDropdown } from '../CommentDropdown/CommentDropdown';
import { DropdownBtn } from '../../../../styles/common/dropdown';
import moreIcon from '../../../../asset/icon/icon-more-vertical.svg';

export default function CommentDropdownBtnPresenter({
  cmntData,
  isDropdownVisible,
  dropdownRef,
  btnRef,
  handleDropdownShow,
  handleClickShow,
}) {
  return (
    <CommentDropdownBtn ref={btnRef} onClick={handleDropdownShow}>
      {isDropdownVisible && (
        <CommentDropdown
          ref={dropdownRef}
          writer={cmntData.writer.nickname}
          handleClickShow={handleClickShow}
          commentId={cmntData._id}
          parentId={cmntData.parent_id}
        />
      )}
    </CommentDropdownBtn>
  );
}

export const CommentDropdownBtn = styled(DropdownBtn)`
  background: none;
  &:hover {
    background: url(${moreIcon});
  }
`;
