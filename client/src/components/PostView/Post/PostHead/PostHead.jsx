import React from 'react';
import useDropdown from '../../../../hooks/useDropdown';
import { useSelector } from 'react-redux';
import PostHeadPresenter from './PostHead.style';

export default function PostHead({ author, date, postId }) {
  const [isDropdownVisible, dropdownRef, btnRef, handleDropdownShow] = useDropdown();
  const loginState = useSelector((state) => state.login);
  const userId = loginState.id;

  const postDate = date.toLocaleDateString();

  return (
    <PostHeadPresenter
      author={author}
      btnRef={btnRef}
      handleDropdownShow={handleDropdownShow}
      isDropdownVisible={isDropdownVisible}
      dropdownRef={dropdownRef}
      postId={postId}
      userId={userId}
      postDate={postDate}
    />
  );
}
