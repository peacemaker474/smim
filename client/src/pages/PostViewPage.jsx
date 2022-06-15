import React from 'react';
import { useLocation } from 'react-router-dom';
import PostPost from '../components/PostView/Post/PostPost/PostPost';
import PostComment from '../components/PostView/Comment/PostComment/PostComment';
import styled from 'styled-components';

const PostViewContainer = styled.div`
  margin-top: 10vh;
  padding-top: 70px;
`;

export default function PostViewPage() {
  const location = useLocation();
  const id = location.pathname.split('view/')[1];

  return (
    <PostViewContainer>
      <PostPost postId={id} />
      <PostComment postId={id} />
    </PostViewContainer>
  );
}
