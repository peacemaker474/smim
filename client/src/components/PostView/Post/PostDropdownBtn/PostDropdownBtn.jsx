import React from 'react';
import useDropdown from '../../../../hooks/useDropdown';
import { useParams } from 'react-router-dom';
import PostDropdownBtnPresenter from './PostDropdownBtn.style';

export default function PostDropdownBtn() {
  const [isDropdownVisible, dropdownRef, btnRef, handleDropdownShow] = useDropdown();
  const { id: postId } = useParams();

  return (
    <PostDropdownBtnPresenter
      isDropdownVisible={isDropdownVisible}
      dropdownRef={dropdownRef}
      btnRef={btnRef}
      handleDropdownShow={handleDropdownShow}
      postId={postId}
    />
  );
}
