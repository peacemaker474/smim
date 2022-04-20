import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCookie } from '../utils/cookie';
import PostBottomBtn from '../components/post/PostBottomBtn';
import PostForm from '../components/post/PostForm';
import Modal from '../components/common/Modal';
import { postUpload } from '../network/post/http';
import { postReset } from '../redux/post/action';

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
  const postData = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathArrItem = pathname.split('/')[2];

  const showModal = () => {
    setIsVisible(!isVisible);
  };

  const handleRequest = async () => {
    const tkn = getCookie('users');
    postUpload(
      {
        title: postData.title,
        content: postData.content,
        tag: postData.hashtag,
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
        <PostHeader>{pathArrItem === 'create' ? '질문하기' : ' 질문 수정 하기'}</PostHeader>
        <PostForm />
        <PostBottomBtn formState={pathArrItem} showModal={showModal} isVisible={isVisible} />
      </PostCreateContainer>
    </>
  );
}

export default PostUploadPage;
