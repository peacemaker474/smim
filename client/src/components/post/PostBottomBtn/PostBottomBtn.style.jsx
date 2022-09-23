import React from 'react';
import styled from 'styled-components';
import { ColorBtn, BorderBtn } from '../../../styles/common/buttons';

function PostBottomBtnPresenter({ formState, onFormCancle }) {
  return (
    <BtnWrap>
      <BtnDiv>
        {formState === 'create' ? (
          <>
            <PostBorderBtn palette='yellow' type='button' onClick={onFormCancle}>
              작성 취소
            </PostBorderBtn>
            <PostColorBtn type='submit' form='upload' palette='yellow'>
              게시물 등록
            </PostColorBtn>
          </>
        ) : (
          <>
            <PostBorderBtn type='button' onClick={onFormCancle} palette='yellow'>
              수정 취소
            </PostBorderBtn>
            <PostColorBtn type='submit' palette='yellow'>
              재등록
            </PostColorBtn>
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
`;

const BtnDiv = styled.div`
  width: 183px;
  display: flex;
  justify-content: space-between;
`;

const PostColorBtn = styled(ColorBtn)`
  width: 5rem;
`;

const PostBorderBtn = styled(BorderBtn)`
  width: 5rem;
`;
