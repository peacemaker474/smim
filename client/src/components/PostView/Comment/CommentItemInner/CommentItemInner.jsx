import React from 'react';
import CommentItemInnerPresenter from './CommentItemInner.style';
import useDropdown from '../../../../hooks/useDropdown';

export default function CommentItemInner({ cmntData, onClickShow, groupId, changedText }) {
  const [isDropdownVisible, dropdownRef, btnRef, handleDropdownShow] = useDropdown();

  const handleDropdownBtnClick = (e) => {
    handleDropdownShow();
    e.target.focus();
  };

  return (
    <CommentItemInnerPresenter
      isDropdownVisible={isDropdownVisible}
      dropdownRef={dropdownRef}
      btnRef={btnRef}
      onDropdownBtnClick={handleDropdownBtnClick}
      cmntData={cmntData}
      onClickShow={onClickShow}
      groupId={groupId}
      changedText={changedText}
    />
  );
}
