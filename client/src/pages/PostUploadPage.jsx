import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostForm from '../components/post/PostForm/PostForm';
import { getReadPostDetail } from '../network/post/http';

function PostUploadPage() {
  const tkn = useSelector((state) => state.authToken).accessToken;

  const { pathname } = useLocation();
  const pathArr = pathname.split('/');
  const pathValue = pathArr[2];
  const postId = pathArr[3];
  const [postData, setPostData] = useState();

  console.log('rendering PostUploadPage');

  const loadPost = useCallback(async () => {
    try {
      const response = await getReadPostDetail(postId, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tkn}`,
        },
      });
      const data = response.data;
      console.log(data);
      setPostData(data);
    } catch (error) {
      console.error(error);
    }
  }, [postId, tkn]);

  useEffect(() => {
    if (pathValue === 'edit') {
      loadPost();
    }
  }, [pathValue, loadPost]);

  return (
    <>
      <PostCreateContainer>
        <PostHeader>{pathValue === 'create' ? '질문하기' : ' 질문 수정 하기'}</PostHeader>
        <PostForm postData={postData} pathValue={pathValue} postId={postId} />
      </PostCreateContainer>
    </>
  );
}

export default PostUploadPage;

const PostCreateContainer = styled.div`
  width: 1200px;
  height: 80vh;
  margin-top: 15vh;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
`;

const PostHeader = styled.h2`
  position: relative;
  width: fit-content;
  font-size: 35px;
  border-bottom: 2px solid
    ${({ palette, theme }) => (palette ? theme.color[palette] : theme.color['black'])};
  @media screen and (max-width: 550px) {
    font-size: 25px;
    width: 100px;
    left: 150px;
  }
`;
