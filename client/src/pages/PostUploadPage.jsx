import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostForm from '../components/post/PostForm/PostForm';
import { getReadPostDetail } from '../network/post/http';
import { useQuery } from 'react-query';
import LoadingPage from './LoadingPage';

function PostUploadPage() {
  const tkn = useSelector((state) => state.authToken).accessToken;
  const { pathname } = useLocation();
  const pathArr = pathname.split('/');
  const pathValue = pathArr[2];
  const postId = pathArr[3];

  const loadPost = async () => {
    try {
      const response = await getReadPostDetail(postId, {
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

  const { data: postData, isLoading } = useQuery(['postEdit'], loadPost);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <PostCreateMain>
      <PostCreateContainer>
        <PostHeader>{pathValue === 'create' ? '질문하기' : ' 질문 수정 하기'}</PostHeader>
        <PostForm postData={postData} pathValue={pathValue} postId={postId} />
      </PostCreateContainer>
    </PostCreateMain>
  );
}

export default PostUploadPage;

const PostCreateMain = styled.main`
  margin-top: 10vh;
`;

const PostCreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 53px auto 0;
  padding: 70px 0;
  width: 865px;
`;

const PostHeader = styled.h2`
  position: relative;
  width: fit-content;
  font-size: 30px;
  margin-bottom: 10px;
  @media screen and (max-width: 550px) {
    font-size: 25px;
    width: 100px;
    left: 150px;
  }
`;
