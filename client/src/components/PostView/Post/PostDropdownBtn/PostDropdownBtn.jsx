import React from 'react';
import useDropdown from '../../../../hooks/useDropdown';
import PostDropdownBtnPresenter from './PostDropdownBtn.style';

export default function PostDropdownBtn() {
  const [isDropdownVisible, dropdownRef, btnRef, handleDropdownShow] = useDropdown();

  return (
    <PostDropdownBtnPresenter
      isDropdownVisible={isDropdownVisible}
      dropdownRef={dropdownRef}
      btnRef={btnRef}
      onDropdownShow={handleDropdownShow}
    />
  );
}
