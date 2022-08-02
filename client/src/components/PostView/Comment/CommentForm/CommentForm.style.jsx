import React from 'react';
import styled from 'styled-components';
import UserImage from '../../../common/UserImage/UserImage';
import CommentTextArea from '../CommentTextArea/CommentTextArea';

export default function CommentFormPresenter({
  loginState,
  handleSubmit,
  handleClickCancel,
  handleloginCheck,
  handleKeyDownCheck,
  onSubmit,
  register,
  setValue,
  value,
  groupId,
  parentId,
  id,
}) {
  return (
    <CmntForm groupId={groupId} parentId={parentId}>
      <UserImage width={'45px'} height={'45px'} imgUrl={loginState.imgUrl} />
      <CmntInputDiv groupId={groupId} id={id}>
        <CommentTextArea
          handleloginCheck={handleloginCheck}
          handleKeyDownCheck={handleKeyDownCheck}
          register={register}
          setValue={setValue}
          value={value}
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

const CmntBtn = styled.button`
  width: 28px;
  padding: 0;
  margin-left: 17px;
`;
