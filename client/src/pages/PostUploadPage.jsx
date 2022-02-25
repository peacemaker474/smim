import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PostBottomBtn from '../components/post/PostBottomBtn';
import PostForm from '../components/post/PostForm';
import Modal from '../components/common/Modal';
import { useNavigate } from 'react-router-dom';
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
export default function PostUploadPage() {
  const { pathname } = useLocation();
  const pathArrItem = pathname.split('/')[2];
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.postReducer);

  const showModal = () => {
    setIsVisible(!isVisible);
  };

  const handleUpload = async (data) => {
    // user_id, title, tag[],content
    // content, hashArr, targetAge, title
    postUpload(
      {
        title: data.title,
        content: data.content,
        tag: data.hashArr,
        targetAge: data.targetAge,
      },
      {
        headers: {
          'Content-Type': 'application/json',
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
  console.log(handleUpload, postData);

  return (
    <>
      {isVisible ? <Modal showModal={showModal}>게시물을 등록하시겠습니까?</Modal> : false}
      <PostCreateContainer>
        <PostHeader>{pathArrItem === 'create' ? '질문하기' : ' 질문 수정 하기'}</PostHeader>
        <PostForm formState={pathArrItem}></PostForm>
        <PostBottomBtn formState={pathArrItem} showModal={showModal} isVisible={isVisible} />
      </PostCreateContainer>
    </>
  );
}
