import React from 'react';
import useDropdown from '../../../hooks/useDropdown';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { DropdownBtn } from '../../../styles/common/dropdown';
import { PostDropdown } from './PostDropdown';

const PostHeadDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 17px;
  border-bottom: 1px ${({ theme }) => theme.color.lightGray} solid;
  margin-bottom: 30px;
`;

const PostAuthor = styled.h4`
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.black};
  &::before {
    display: block;
    content: '';
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-color: #25a0fc;
    margin-right: 14px;
  }
`;
const PostDate = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.color.gray};
`;

const PostDropdownBtn = styled(DropdownBtn)``;

export default function PostHead({ author, date, postId }) {
  const [isDropdownVisible, dropdownRef, btnRef, handleDropdownShow] = useDropdown();
  const loginState = useSelector((state) => state.loginReducer);
  const userId = loginState.id;

  return (
    <PostHeadDiv>
      <PostAuthor>{author}</PostAuthor>
      <PostDate>{date.toLocaleDateString()}</PostDate>
      {author === userId && (
        <PostDropdownBtn ref={btnRef} onClick={handleDropdownShow}>
          {isDropdownVisible && <PostDropdown ref={dropdownRef} postId={postId} />}
        </PostDropdownBtn>
      )}
    </PostHeadDiv>
  );
}
