import React from 'react';
// import { useSelector } from 'react-redux';
import useDropdown from '../../../../hooks/useDropdown';
import useVisible from '../../../../hooks/useVisible';
import CommentItemPresenter from './CommentItem.style';

export default function CommentItem({ cmntData }) {
  const [isDropdownVisible, dropdownRef, btnRef, handleDropdownShow] = useDropdown();
  const [isTargetVisible, handleClickShow] = useVisible(false);
  //   const loginState = useSelector((state) => state.loginReducer);

  return (
    <CommentItemPresenter
      cmntData={cmntData}
      handleClickShow={handleClickShow}
      isTargetVisible={isTargetVisible}
      btnRef={btnRef}
      handleDropdownShow={handleDropdownShow}
      isDropdownVisible={isDropdownVisible}
      dropdownRef={dropdownRef}
    />
  );
}
