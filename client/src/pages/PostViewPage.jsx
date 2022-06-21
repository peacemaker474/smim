import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetComment } from '../redux/slice/commentSlice';
import PostPost from '../components/postview/Post/PostPost/PostPost';
import PostComment from '../components/postview/Comment/PostComment/PostComment';
import styled from 'styled-components';

const PostViewContainer = styled.div`
  margin-top: 10vh;
  padding-top: 70px;
`;

export default function PostViewPage() {
  const location = useLocation();
  const id = location.pathname.split('view/')[1];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetComment());
  }, [dispatch]);

  return (
    <PostViewContainer>
      <PostPost postId={id} />
      <PostComment postId={id} />
    </PostViewContainer>
  );
}
