import React from 'react';
import styled from 'styled-components';
import { PostListData } from '../../../type/postTypes';
import PostContent from '../atoms/PostContent';
import PostHeader from '../atoms/PostHeader';
import PostsTitle from '../atoms/PostsTitle';

interface ListsPorps {
  age: string;
  posts: PostListData[];
  handleMovePostDetail: (evt: React.MouseEvent<HTMLLIElement>) => void;
}

function MainLists({ age, posts, handleMovePostDetail }: ListsPorps) {
  return (
    <MainPostsContainer>
      <PostsTitle age={age} />
      {
        !posts.length ?
        <NonePostTitle> 게시글이 존재하지 않습니다. 궁금한 것을 물어보세요. </NonePostTitle>
        :
        <PostsContent>
          {posts &&
            posts.map((post) => (
              <PostsList id={post._id} key={post._id} onClick={handleMovePostDetail}>
                <PostHeader
                  answer={!post.meta.answer ? '답변 대기' : '답변 완료'}
                  title={post.title.length <= 15 ? post.title : `${post.title.substring(0, 15)}...`}
                />
                <PostContent
                  nickname={post.owner.nickname}
                  createAt={post.createAt.slice(5, 10).replaceAll('-', '.')}
                  likes={post.meta.likes}
                />
              </PostsList>
            ))}
        </PostsContent>
      }
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
  position: relative;
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

const NonePostTitle = styled.h3`
  width: 70%;
  text-align: center;
  font-size: 1rem;
  word-break: keep-all;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 25px;

  @media ${({ theme }) => theme.device.ipad} {
    width: 60%;
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