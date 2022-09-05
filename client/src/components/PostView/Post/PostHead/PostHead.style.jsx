import React from 'react';
import styled from 'styled-components';
import UserImage from '../../../common/UserImage/UserImage';
import PostDropdownBtn from '../PostDropdownBtn/PostDropdownBtn';

export default function PostHeadPresenter({ author, userId, postDate, postViews }) {
  return (
    <PostHeadDiv>
      <PostAuthor>
        <UserImage width={'42px'} height={'42px'} imgUrl={author.imageUrl} />
        <UserName>{author.nickname}</UserName>
      </PostAuthor>
      <PostAddOns>
        <AddOnsSpan>{postDate}</AddOnsSpan>
        <AddOnsSpan>조회수 {postViews}</AddOnsSpan>
        {author.userId === userId && <PostDropdownBtn />}
      </PostAddOns>
    </PostHeadDiv>
  );
}

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
`;

const PostAddOns = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  margin: 0 10px;
`;

const AddOnsSpan = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.color.gray};
  margin-right: 10px;
`;
