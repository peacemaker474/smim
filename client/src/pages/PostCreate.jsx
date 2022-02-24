import React from 'react';
import styled from 'styled-components';
import PostTargetAge from '../components/post/PostTargetAge';
import Posteditor from '../components/post/posteditor';
import PostTitle from '../components/post/PostTitle';
import PostBottomBtn from '../components/post/PostBottomBtn';
import PostTag from '../components/post/PostTag';

const PostCreateContainer = styled.div`
  width: 1200px;
  height: 80vh;
  margin-top: 15vh;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
`;

const PostHeader = styled.div`
  position: relative;
  width: 140px;
  font-size: 35px;
  border-bottom: 2px solid
    ${({ palette, theme }) => (palette ? theme.color[palette] : theme.color['black'])};
  @media screen and (max-width: 550px) {
    font-size: 25px;
    width: 100px;
    left: 150px;
  }
`;
export default function PostCreate() {
  return (
    <PostCreateContainer>
      <PostHeader>질문하기</PostHeader>
      <form id='upload'>
        <PostTitle />
        <PostTargetAge />
        <PostTag />
        <Posteditor />
      </form>
      <PostBottomBtn />
    </PostCreateContainer>
  );
}
