import React, { forwardRef } from 'react';
import styled from 'styled-components';

export default forwardRef(function CommentInputPresenter(
  {
    loginState,
    handleCommentCreate,
    handleCommentWrite,
    inputText,
    handleClickCancel = undefined,
    handleCommentEdit,
    id,
  },
  ref
) {
  return (
    <CmntForm>
      <CmntImg src={`http://localhost:4000/${loginState.imgUrl}`}></CmntImg>
      <CmntInput
        type='text'
        placeholder='답변을 기다립니다.'
        onChange={handleCommentWrite}
        value={inputText}
        ref={ref}
      />
      {id ? (
        <>
          <CmntBtn type='button' onClick={handleClickCancel}>
            취소
          </CmntBtn>
          <CmntBtn type='submit' onClick={handleCommentEdit}>
            수정
          </CmntBtn>
        </>
      ) : (
        <>
          <CmntBtn type='button' onClick={handleClickCancel}>
            취소
          </CmntBtn>
          <CmntBtn type='submit' onClick={handleCommentCreate}>
            게시
          </CmntBtn>
        </>
      )}
    </CmntForm>
  );
});

const CmntForm = styled.form`
  width: 794px;
  // height: 59px;
  // border: 1px solid #c4c4c4;
  margin-bottom: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CmntImg = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid #091d3e;
  margin-right: 11px;
  // background-image: url('${({ url }) => url}');
`;

const CmntInput = styled.input`
  width: 688px;
  height: 35px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};
  outline: none;
  resize: none;
  font-size: 13px;
`;

const CmntBtn = styled.button`
  width: 28px;
  padding: 0;
  margin-left: 17px;
`;
