import React from 'react';
import CommentItemInnerPresenter from './CommentItemInner.style';
import useDropdown from '../../../../hooks/useDropdown';

export default function CommentItemInner({ cmntData, handleClickShow, groupId, itemText }) {
  const [isDropdownVisible, dropdownRef, btnRef, handleDropdownShow] = useDropdown();
  return (
    <CommentItemInnerPresenter
      isDropdownVisible={isDropdownVisible}
      dropdownRef={dropdownRef}
      btnRef={btnRef}
      handleDropdownShow={handleDropdownShow}
      cmntData={cmntData}
      handleClickShow={handleClickShow}
      groupId={groupId}
      itemText={itemText}
    />
  );
}
