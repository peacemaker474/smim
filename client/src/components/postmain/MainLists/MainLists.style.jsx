import React from 'react';
import styled from 'styled-components';
import heartFill from '../../../asset/icon/icon-heart-fill.svg';

const MainPostsContainer = styled.div`
  width: 317px;
  height: 363px;
  border: 2px solid ${({ theme }) => theme.color.lightGray};
  border-radius: 14px;

  @media screen and (max-width: 1180px) {
    width: 420px;
    height: 521px;
  }
`;
const PostsTitle = styled.div`
  display: flex;
  padding: 0 15px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.color.lightGray};
  height: 17%;
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

const PostsContent = styled.ul`
  width: 100%;
  height: 83%;
`;

const PostsList = styled.li`
  height: 20%;
  width: 100%;
  padding: 10px;
  border-bottom: 2px solid ${({ theme }) => theme.color.lightGray};
  &:last-child {
    border: none;
  }
`;

const ListHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-bottom: 0.8em;
  font-size: 1em;
  font-weight: bold;
`;

const ListisAnswer = styled.p`
  width: 25%;
  color: #038cfc;
`;

const ListTitle = styled.h3`
  width: 80%;
`;

const ListContent = styled.div`
  display: flex;
  font-size: 0.8em;
  @media screen and (max-width: 1180px) {
    padding-top: 0.3em;
  }
`;

const PostOwner = styled.p`
  width: 23%;
`;

const PostLike = styled.p`
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
              <ListHeader>
                <ListisAnswer> {!post.meta.answer ? '답변 대기' : '답변 완료'} </ListisAnswer>
                <ListTitle>{post.title}</ListTitle>
              </ListHeader>
              <ListContent>
                <PostOwner>{post.owner.nickname}</PostOwner>
                <PostOwner>{post.createAt.slice(5, 10).replaceAll('-', '.')}</PostOwner>
                <PostLike>{post.meta.likes}</PostLike>
              </ListContent>
            </PostsList>
          ))}
      </PostsContent>
    </MainPostsContainer>
  );
}

export default React.memo(MainListsStyle);
