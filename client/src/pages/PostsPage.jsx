import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import PostListHead from '../components/postlist/PostListHead/PostListHead';
import PostListBody from '../components/postlist/PostListBody/PostListBody';
import NotFound from './NotFound';

function PostsPage() {
  const [searchList, setSearchList] = useState({
    option: '',
    inputs: '',
  });
  const [postFilter, setPostFilter] = useState('newer');
  const { age: postAge } = useParams();

  if (
    postAge === '10' ||
    postAge === '20' ||
    postAge === '30' ||
    postAge === '40' ||
    postAge === '50'
  ) {
    return (
      <PostListMain>
        <PostListContainer>
          <PostListHeading>{postAge}대 질문리스트</PostListHeading>
          <PostListHead
            setSearchList={setSearchList}
            postFilter={postFilter}
            setPostFilter={setPostFilter}
            age={postAge}
          />
          <PostListBody age={postAge} postFilter={postFilter} searchList={searchList} />
        </PostListContainer>
      </PostListMain>
    );
  } else {
    return <NotFound />;
  }
}

export default PostsPage;

const PostListMain = styled.main``;

const PostListContainer = styled.div`
  margin: 100px auto 0;
  padding: 70px 0 200px;
  width: 730px;
  @media screen and (max-width: 588px) {
    width: 252px;
    padding: 50px 0;
  }
  @media (min-width: 588px) and (max-width: 850px) {
    width: 482px;
  }
`;

const PostListHeading = styled.h2`
  font-size: 32px;
  margin-bottom: 90px;
  text-align: center;
  @media screen and (max-width: 588px) {
    font-size: 27px;
    margin-bottom: 54px;
  }
`;
