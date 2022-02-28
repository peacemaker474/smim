import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ColorBtn } from '../../styles/common/buttons';
import { postReset } from '../../redux/post/action';

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
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.postReducer);

  const handelBtnClick = (data) => {
    if (data.title === '') {
      console.log('제목을 입력해주세요');
    } else if (data.targetAge === 0) {
      console.log('연령층을 선택해주세요');
    } else if (data.content === '') {
      console.log('내용을 입력해주세요');
    } else {
      showModal();
    }
  };
  return (
    <>
      <BtnWrap>
        <BtnDiv>
          {formState === 'create' ? (
            <>
              <ColorBtn
                width={'5rem'}
                palette={'yellow'}
                onClick={() => {
                  dispatch(postReset());
                  navigate('/');
                }}
              >
                작성 취소
              </ColorBtn>
              <ColorBtn
                width={'5rem'}
                palette={'yellow'}
                type='button'
                form='upload'
                onClick={(e) => {
                  e.preventDefault();
                  handelBtnClick(postData);
                }}
              >
                게시물 등록
              </ColorBtn>
            </>
          ) : (
            <>
              <ColorBtn
                width={'5rem'}
                palette={'yellow'}
                onClick={() => {
                  navigate('/');
                }}
              >
                수정 취소
              </ColorBtn>
              <ColorBtn
                width={'5rem'}
                palette={'yellow'}
                type='button'
                form='upload'
                onClick={(e) => {
                  e.preventDefault();
                  handelBtnClick(postData);
                }}
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
