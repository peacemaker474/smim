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
  keyDownCheck,
  inputRef,
}) {
  return (
    <CmntForm groupId={groupId} parentId={parentId}>
      <UserImage width={'45px'} height={'45px'} imgUrl={loginState.imgUrl} />
      <CmntInputDiv groupId={groupId} id={id}>
        <CmntInput
          type='submit'
          placeholder='답변을 기다립니다.'
          {...register('comment', { required: true })}
          onClick={loginCheck}
          onKeyDown={keyDownCheck}
          groupId={groupId}
          id={id}
        />
        {id ? (
          <>
            <CmntBtn type='button' onClick={handleClickCancel}>
              취소
            </CmntBtn>
            <CmntBtn
              type='submit'
              onClick={handleSubmit(onSubmit)}
              groupId={groupId}
              parentId={parentId}
            >
              수정
            </CmntBtn>
          </>
        ) : (
          <>
            <CmntBtn type='button' onClick={handleClickCancel}>
              취소
            </CmntBtn>
            <CmntBtn
              type='submit'
              onClick={handleSubmit(onSubmit)}
              groupId={groupId}
              parentId={parentId}
            >
              게시
            </CmntBtn>
          </>
        )}
      </CmntInputDiv>
    </CmntForm>
  );
}

const CmntForm = styled.div`
  width: auto;
  margin-bottom: ${({ groupId }) => (groupId ? '15px' : '38px')};
  margin-top: ${({ groupId }) => (groupId ? '15px' : '0')};
  display: flex;
  align-items: flex-start;
`;

const CmntInputDiv = styled.div`
  width: ${({ groupId, id }) => (!groupId ? '94%' : groupId === id ? '94%' : '90%')};
  display: flex;
  align-items: flex-end;
`;

const CmntInput = styled.textarea`
  width: ${({ groupId, id }) => (!groupId ? '84%' : groupId === id ? '84%' : '83%')};
  height: 27px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};
  outline: none;
  resize: none;
  font-size: 13px;
  margin-left: 20px;
  overflow: hidden;
`;

const CmntBtn = styled.button`
  width: 28px;
  padding: 0;
  margin-left: 17px;
`;
