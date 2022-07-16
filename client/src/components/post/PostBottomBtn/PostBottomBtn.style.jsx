import React from 'react';
import styled from 'styled-components';
import { ColorBtn } from '../../../styles/common/buttons';

function PostBottomBtnPresenter({ formState, handleFormCancle, handleSubmit }) {
  return (
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
              onClick={handleSubmit}
            >
              게시물 등록
            </ColorBtn>
          </>
        ) : (
          <>
            <ColorBtn width={'5rem'} palette={'yellow'} onClick={handleFormCancle}>
              수정 취소
            </ColorBtn>
            <ColorBtn width={'5rem'} palette={'yellow'} type='button' onClick={handleSubmit}>
              재등록
            </ColorBtn>
          </>
        )}
      </BtnDiv>
    </BtnWrap>
  );
}

export default PostBottomBtnPresenter;

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
