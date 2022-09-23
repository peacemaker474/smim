import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { getReadPostDetail } from '../network/post/http';
import { getCreateAccessToken } from '../network/main/http';
import { SET_TOKEN } from '../redux/auth';
import LoadingPage from './LoadingPage';
import PostForm from '../components/post/PostForm/PostForm';

function PostUploadPage() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const pathArr = pathname.split('/');
  const pathValue = pathArr[2];
  const postId = pathArr[3];

  useEffect(() => {
    getCreateAccessToken().then((res) => {
      if (res.data.success) {
        dispatch(SET_TOKEN(res.data.accessToken));
      }
    });
  }, [dispatch]);

  const loadPost = async () => {
    try {
      if (postId) {
        const response = await getReadPostDetail(postId);
        return response.data;
      } else {
        return;
      }
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

const PostCreateMain = styled.main``;

const PostCreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px auto 0;
  padding: 70px 0;
  @media screen and (max-width: 550px) {
    width: 333px;
    padding: 50px 0;
  }
  @media (min-width: 550px) and (max-width: 612px) {
    width: 500px;
  }
  @media (min-width: 612px) and (max-width: 768px) {
    width: 500px;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    width: 500px;
  }
  @media (min-width: 992px) and (max-width: 1200px) {
    width: 697px;
  }
  @media (min-width: 1200px) {
    width: 865px;
  }
`;

const PostHeader = styled.h2`
  position: relative;
  font-size: 30px;
  width: 100%;
  margin: 0 auto 10px;
  @media screen and (max-width: 612px) {
    font-size: 25px;
    text-align: center;
  }
`;
