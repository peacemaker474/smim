import React from 'react';
import styled from 'styled-components';
import heartFill from '../../../asset/icon/icon-heart-fill.svg';

const MainPostsContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.color.lightGray};
  border-radius: 14px;
`;
const PostsTitle = styled.div`
  display: flex;
  padding: 0 15px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.color.lightGray};
  height: 60px;
`;

const MoreBtn = styled.button`
  width: 67px;
  height: 31px;
  padding: 0;
  background-color: ${({ theme }) => theme.color.yellow};
  border-radius: 4px;
  font-weight: 700;
  color: #ffffff;
`;

const PostsContent = styled.div``;

const PostsList = styled.div`
  height: 60px;
  width: 100%;
  padding: 10px;
  & + div {
    border-top: 2px solid ${({ theme }) => theme.color.lightGray};
  }
`;

const ListTitle = styled.h3`
  margin-bottom: 6px;
`;

const ListContent = styled.div`
  display: flex;
`;

const PostOwner = styled.span``;

const PostLike = styled.span`
  display: flex;
  color: ${({ theme }) => theme.color.red};
  &::before {
    content: '';
    width: 15px;
    height: 15px;
    display: block;
    background: url(${heartFill});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    padding-right: 5px;
  }
  margin-left: 10px;
  margin-right: 10px;
`;

function MainListsStyle({ age, posts }) {
  return (
    <MainPostsContainer>
      <PostsTitle>
        <h2>{age}대에게 질문하세요</h2>
        <MoreBtn>더보기</MoreBtn>
      </PostsTitle>
      <PostsContent>
        {posts &&
          posts.map((post) => (
            <PostsList key={post._id}>
              <ListTitle>{post.title}</ListTitle>
              <ListContent>
                <PostOwner>{post.owner}</PostOwner>
                <PostLike>{post.meta.likes}</PostLike>
                <PostOwner>{post.createAt.slice(0, 10).replaceAll('-', '.')}</PostOwner>
              </ListContent>
            </PostsList>
          ))}
      </PostsContent>
    </MainPostsContainer>
  );
}

export default MainListsStyle;
