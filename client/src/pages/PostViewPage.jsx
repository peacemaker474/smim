import React from 'react';
import PostPost from '../components/PostView/PostPost';
import PostComment from '../components/PostView/PostComment';
import styled from 'styled-components';

const PostViewContainer = styled.div`
  margin-top: 10vh;
  padding-top: 70px;
`;

export default function PostViewPage() {
  return (
    <PostViewContainer>
      <PostPost />
      <PostComment />
    </PostViewContainer>
  );
}
