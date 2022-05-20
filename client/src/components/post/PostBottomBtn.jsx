import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ColorBtn } from '../../styles/common/buttons';
import { postReset } from '../../redux/post/action';
import {
  contentCheck,
  titleCheck,
  ageCheck,
  hashtagCheck,
  resetCheck,
} from '../../redux/postForm/action';

const BtnWrap = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: 550px) {
    width: 450px;
  }
`;

const BtnDiv = styled.div`
  width: 183px;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 550px) {
    width: 180px;
  }
`;
function PostBottomBtn({ formState, showModal }) {
  const navigate = useNavigate();
  const postData = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();

  const handleFormCheck = (data) => {
    if (data.title === '') {
      console.log('제목을 입력해주세요');
      dispatch(titleCheck());
    } else if (data.targetAge === '') {
      console.log('연령층을 선택해주세요');
      dispatch(ageCheck());
    } else if (data.hashtag.length === 0) {
      console.log('태그를 입력해주세요');
      dispatch(hashtagCheck());
    } else if (data.content === '') {
      console.log('내용을 입력해주세요');
      dispatch(contentCheck());
    } else {
      dispatch(resetCheck());
      showModal();
    }
  };

  const handleFormCancle = () => {
    dispatch(postReset());
    dispatch(resetCheck());
    navigate(-1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleFormCheck(postData);
  };

  return (
    <>
      <BtnWrap>
        <BtnDiv>
          {formState === 'create' ? (
            <>
              <ColorBtn width={'5rem'} palette={'yellow'} onClick={handleFormCancle}>
                작성 취소
              </ColorBtn>
              <ColorBtn
                width={'5rem'}
                palette={'yellow'}
                type='button'
                form='upload'
                onClick={handleFormSubmit}
              >
                게시물 등록
              </ColorBtn>
            </>
          ) : (
            <>
              <ColorBtn width={'5rem'} palette={'yellow'} onClick={handleFormCancle}>
                수정 취소
              </ColorBtn>
              <ColorBtn
                width={'5rem'}
                palette={'yellow'}
                type='button'
                form='upload'
                onClick={handleFormSubmit}
              >
                재등록
              </ColorBtn>
            </>
          )}
        </BtnDiv>
      </BtnWrap>
    </>
  );
}

export default PostBottomBtn;
