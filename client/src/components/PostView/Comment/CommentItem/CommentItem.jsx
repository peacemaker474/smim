import React from 'react';
import useDropdown from '../../../../hooks/useDropdown';
import useVisible from '../../../../hooks/useVisible';
import CommentItemPresenter from './CommentItem.style';

export default function CommentItem({ cmntData, groupId }) {
  const [isDropdownVisible, dropdownRef, btnRef, handleDropdownShow] = useDropdown();
  const [isTargetVisible, handleClickShow] = useVisible(false);

  return (
    <CommentItemPresenter
      cmntData={cmntData}
      btnRef={btnRef}
      handleDropdownShow={handleDropdownShow}
      isDropdownVisible={isDropdownVisible}
      dropdownRef={dropdownRef}
      groupId={groupId}
      isTargetVisible={isTargetVisible}
      handleClickShow={handleClickShow}
    />
  );
}
