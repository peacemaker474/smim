import React from 'react';
import PostPost from '../components/PostView/PostPost';
import PostComment from '../components/PostView/PostComment';
import styled from 'styled-components';

const PostViewContainer = styled.div`
  margin-top: 10vh;
  padding-top: 70px;
`;

const PostViewH2 = styled.h1`
  width: 794px;
  font-size: 14px;
  font-weight: 500;
  line-height: 19px;
  color: ${({ theme }) => theme.color.black};
  margin: 0 auto;
`;

export default function PostViewPage() {
  return (
    <PostViewContainer>
      <PostViewH2>20대에게</PostViewH2>
      <PostPost />
      <PostComment />
    </PostViewContainer>
  );
}
