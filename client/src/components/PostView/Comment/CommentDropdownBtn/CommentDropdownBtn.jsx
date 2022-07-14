import React from 'react';
import useDropdown from '../../../../hooks/useDropdown';
import CommentDropdownBtnPresenter from './CommentDropdownBtn.style';

export default function CommentDropdownBtn({ cmntData, handleClickShow }) {
  const [isDropdownVisible, dropdownRef, btnRef, handleDropdownShow] = useDropdown();
  return (
    <CommentDropdownBtnPresenter
      isDropdownVisible={isDropdownVisible}
      dropdownRef={dropdownRef}
      btnRef={btnRef}
      handleDropdownShow={handleDropdownShow}
      cmntData={cmntData}
      handleClickShow={handleClickShow}
    />
  );
}
