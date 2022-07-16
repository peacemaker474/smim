import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import PostListItem from '../components/postlist/PostListItem/PostListItem';
import { getPostListRead } from '../network/post/http';
import LoadingPage from './LoadingPage';
import PostListHead from '../components/postlist/PostListHead/PostListHead';

function PostsPage() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const postAge = query.get('age');
  const age = useMemo(() => {
    return postAge;
  }, [postAge]);
  const tkn = useSelector((state) => state.authToken).accessToken;
  const [postArray, setPostArray] = useState();

  const settingData = async () => {
    try {
      const response = await getPostListRead(age, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tkn}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, isLoading } = useQuery('postArray', settingData);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <PostListMain>
      <PostListContainer>
        <PostListHeading>{age}대 질문리스트</PostListHeading>
        <PostListHead setPostArray={setPostArray} age={age} />
        <PostListBody>
          {(postArray || data).map((el) => (
            <PostListItem key={el._id} postData={el} />
          ))}
        </PostListBody>
      </PostListContainer>
    </PostListMain>
  );
}

export default PostsPage;

const PostListMain = styled.main`
  margin-top: 10vh;
`;

const PostListContainer = styled.div`
  margin: 53px auto 0;
  padding: 70px 0;
  width: 707px;
`;

const PostListHeading = styled.h2`
  font-size: 32px;
  margin-bottom: 90px;
  text-align: center;
`;

const PostListBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px 14px;
  width: 707px;
  margin-top: 67px;
`;
