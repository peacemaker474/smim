import React from 'react';
import useDropDown from '../../../hooks/useDropDown';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { DropDownBtn } from '../../../styles/common/dropdown';
import { PostDropDown } from './PostDropDown';

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

const PostDropDownBtn = styled(DropDownBtn)``;

export default function PostHead({ author, date, postId }) {
  const [isVisible, dropDownRef, btnRef, handleDropDownShow] = useDropDown();
  const loginState = useSelector((state) => state.loginReducer);
  const userId = loginState.id;

  return (
    <PostHeadDiv>
      <PostAuthor>{author}</PostAuthor>
      <PostDate>{date.toLocaleDateString()}</PostDate>
      {author === userId && (
        <PostDropDownBtn ref={btnRef} onClick={handleDropDownShow}>
          {isVisible && <PostDropDown ref={dropDownRef} postId={postId} />}
        </PostDropDownBtn>
      )}
    </PostHeadDiv>
  );
}
