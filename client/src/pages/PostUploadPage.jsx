import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { totalAdd } from '../redux/postCreate/action';
import { getCookie } from '../utils/cookie';
import PostBottomBtn from '../components/post/PostBottomBtn';
import PostForm from '../components/post/PostForm';
import Modal from '../components/common/Modal';
import { postPostCreate, getPostDetailRead } from '../network/post/http';
import { postReset } from '../redux/postCreate/action';
import { resetCheck } from '../redux/postForm/action';

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
function PostUploadPage() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const postData = useSelector((state) => state.postCreateReducer);
  // const postForm = useSelector((state) => state.postFormReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathArr = pathname.split('/');
  const pathValue = pathArr[2];
  const postId = pathArr[3];
  const tkn = getCookie('users');

  const fetchAPI = useCallback(async () => {
    try {
      const response = await getPostDetailRead(postId, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tkn}`,
        },
      });
      const data = response.data;

      dispatch(
        totalAdd({
          title: data.title,
          targetAge: data.targetAge,
          content: data.content,
          hashtag: data.hashtag,
        })
      );
    } catch (error) {
      console.error(error);
    }
  }, [postId, tkn, dispatch]);

  console.log(postData);

  useEffect(() => {
    if (pathValue === 'edit') {
      fetchAPI();
    } else {
      dispatch(postReset()); // post data reset
    }
    dispatch(resetCheck()); // post state reset - all false
  }, [fetchAPI, pathValue, dispatch]);

  const showModal = () => {
    setIsVisible(!isVisible);
  };

  const handleRequest = async () => {
    const tkn = getCookie('users');
    postPostCreate(
      {
        title: postData.title,
        content: postData.content,
        hashtag: postData.hashtag,
        targetAge: postData.targetAge,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tkn}`,
        },
      }
    )
      .then((res) => {
        console.log(res.data);
        dispatch(postReset());
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {isVisible ? (
        <Modal showModal={showModal} actionfunc={handleRequest}>
          게시물을 등록하시겠습니까?
        </Modal>
      ) : (
        false
      )}
      <PostCreateContainer>
        <PostHeader>{pathValue === 'create' ? '질문하기' : ' 질문 수정 하기'}</PostHeader>
        <PostForm />
        <PostBottomBtn formState={pathValue} showModal={showModal} isVisible={isVisible} />
      </PostCreateContainer>
    </>
  );
}

export default PostUploadPage;
