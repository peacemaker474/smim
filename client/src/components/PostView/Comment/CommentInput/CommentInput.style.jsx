import React from 'react';
import styled from 'styled-components';
import UserImage from '../../../common/UserImage/UserImage';

export default function CommentInputPresenter({
  loginState,
  handleSubmit,
  register,
  handleClickCancel,
  onSubmit,
  id,
  loginCheck,
  groupId,
  parentId,
}) {
  return (
    <CmntForm onSubmit={handleSubmit(onSubmit)} groupId={groupId} parentId={parentId}>
      <UserImage width={'45px'} height={'45px'} imgUrl={loginState.imgUrl} />
      <CmntInput
        type='text'
        placeholder='답변을 기다립니다.'
        {...register('comment', { required: true })}
        onClick={loginCheck}
        groupId={groupId}
      />
      {id ? (
        <>
          <CmntBtn type='button' onClick={handleClickCancel}>
            취소
          </CmntBtn>
          <CmntBtn type='submit'>수정</CmntBtn>
        </>
      ) : (
        <>
          <CmntBtn type='button' onClick={handleClickCancel}>
            취소
          </CmntBtn>
          <CmntBtn type='submit'>게시</CmntBtn>
        </>
      )}
    </CmntForm>
  );
}

const CmntForm = styled.form`
  width: ${({ groupId }) => (groupId ? '704px' : '794px')};
  margin-bottom: ${({ groupId }) => (groupId ? '0' : '38px')};
  margin-top: ${({ groupId }) => (groupId ? '15px' : '0')};
  margin-left: ${({ parentId, groupId }) =>
    parentId && groupId ? '0' : parentId || groupId ? '63px' : '0'};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CmntInput = styled.input`
  width: ${({ groupId }) => (groupId ? '562px' : '635px')};
  height: 35px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};
  outline: none;
  resize: none;
  font-size: 13px;
  margin-left: 20px;
`;

const CmntBtn = styled.button`
  width: 28px;
  padding: 0;
  margin-left: 17px;
`;
