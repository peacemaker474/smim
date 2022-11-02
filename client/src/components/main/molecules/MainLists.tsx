import React from 'react';
import styled from 'styled-components';
import { MainListsData } from '../../../types';
import PostContent from '../atoms/PostContent';
import PostHeader from '../atoms/PostHeader';
import PostsTitle from '../atoms/PostsTitle';

interface ListsPorps {
  age: string;
  posts: MainListsData[];
  handleMovePostDetail: (evt: React.MouseEvent<HTMLLIElement>) => void;
}

function MainLists({ age, posts, handleMovePostDetail }: ListsPorps) {
  return (
    <MainPostsContainer>
      <PostsTitle age={age} />
      <PostsContent>
        {posts &&
          posts.map((post) => (
            <PostsList id={post._id} key={post._id} onClick={handleMovePostDetail}>
              <PostHeader
                answer={post.meta.answer}
                title={post.title}
              />
              <PostContent
                nickname={post.owner.nickname}
                createAt={post.createAt}
                likes={post.meta.likes}
              />
            </PostsList>
          ))}
      </PostsContent>
    </MainPostsContainer>
  );
}

export default MainLists;

const MainPostsContainer = styled.div`
  width: 317px;
  height: 363px;
  border: 2px solid ${({ theme }) => theme.color.lightGray};
  border-radius: 14px;
  margin: 0 auto;
  @media ${({ theme }) => theme.device.webMiddle} {
    width: 30%;
    height: 80%;
  }
  @media ${({ theme }) => theme.device.ipad} {
    width: 90%;
    height: 521px;
  }
  @media ${({ theme }) => theme.device.mobileMiddle} {
    width: 100%;
  }
`;

const PostsContent = styled.ul`
  width: 100%;
  height: 83%;
`;

const PostsList = styled.li`
  width: 100%;
  height: 20%;
  padding: 10px;
  border-bottom: 2px solid ${({ theme }) => theme.color.lightGray};
  cursor: pointer;
  &:last-child {
    border: none;
  }
  @media ${({ theme }) => theme.device.webMiddle} {
    padding: 7px;
  }
  @meida ${({ theme }) => theme.device.ipad} {
    padding: 10px;
  }
  @media ${({ theme }) => theme.device.mobileMiddle} {
    padding: 7px;
  }
`;