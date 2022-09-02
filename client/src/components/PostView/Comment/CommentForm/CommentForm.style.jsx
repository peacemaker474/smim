import React from 'react';
import styled from 'styled-components';
import UserImage from '../../../common/UserImage/UserImage';
import CommentTextArea from '../CommentTextArea/CommentTextArea';

export default function CommentFormPresenter({
  loginState,
  onSubmit,
  onFormInputCancel,
  onKeyDownCheck,
  onCommentTextareaSubmit,
  register,
  setValue,
  value,
  groupId,
  parentId,
  id,
  writer,
  state,
}) {
  return (
    <CmntForm groupId={groupId} method='POST' onSubmit={onSubmit(onCommentTextareaSubmit)}>
      <UserImage width={'42px'} height={'42px'} imgUrl={loginState.imgUrl} />
      <CmntInputDiv state={state}>
        <CommentTextArea
          onKeyDownCheck={onKeyDownCheck}
          register={register}
          setValue={setValue}
          value={value}
          groupId={groupId}
          parentId={parentId}
          id={id}
          writer={writer}
        />
        {id ? (
          <CmntBtnBox state={state}>
            <CmntBtn type='button' onClick={onFormInputCancel}>
              취소
            </CmntBtn>
            <CmntBtn type='submit' groupId={groupId} parentId={parentId}>
              수정
            </CmntBtn>
          </CmntBtnBox>
        ) : (
          <CmntBtnBox state={state}>
            <CmntBtn type='button' onClick={onFormInputCancel}>
              취소
            </CmntBtn>
            <CmntBtn type='submit' groupId={groupId} parentId={parentId}>
              게시
            </CmntBtn>
          </CmntBtnBox>
        )}
      </CmntInputDiv>
    </CmntForm>
  );
}

const CmntForm = styled.form`
  width: auto;
  margin-bottom: ${({ groupId }) => (groupId ? '15px' : '38px')};
  margin-top: ${({ groupId }) => (groupId ? '15px' : '0')};
  display: flex;
  align-items: flex-start;
`;

const CmntInputDiv = styled.div`
  @media (max-width: 612px) {
    width: ${({ state }) =>
      state === 'main'
        ? '283px'
        : state === 'main Edit'
        ? '283px'
        : state === 'main Reply'
        ? '193px'
        : state === 'main Reply Edit'
        ? '218px'
        : state === 'Reply Reply'
        ? '128px'
        : '218px'};
    display: ${({ state }) =>
      state === 'main'
        ? 'flex'
        : state === 'main Edit'
        ? 'flex'
        : state === 'main Reply'
        ? 'block'
        : state === 'main Reply Edit'
        ? 'block'
        : state === 'Reply Reply'
        ? 'block'
        : 'block'};
  }

  @media (min-width: 612px) and (max-width: 768px) {
    width: ${({ state }) =>
      state === 'main'
        ? '460px'
        : state === 'main Edit'
        ? '460px'
        : state === 'main Reply'
        ? '374px'
        : state === 'main Reply Edit'
        ? '396px'
        : state === 'Reply Reply'
        ? '308px'
        : '396px'};
  }

  @media (min-width: 768px) and (max-width: 992px) {
    width: ${({ state }) =>
      state === 'main'
        ? '595px'
        : state === 'main Edit'
        ? '595px'
        : state === 'main Reply'
        ? '506px'
        : state === 'main Reply Edit'
        ? '530px'
        : state === 'Reply Reply'
        ? '441px'
        : '530px'};
  }

  @media (min-width: 992px) and (max-width: 1200px) {
    width: ${({ state }) =>
      state === 'main'
        ? '725px'
        : state === 'main Edit'
        ? '725px'
        : state === 'main Reply'
        ? '636px'
        : state === 'main Reply Edit'
        ? '660px'
        : state === 'Reply Reply'
        ? '572px'
        : '660px'};
  }

  @media (min-width: 1200px) {
    width: ${({ state }) =>
      state === 'main'
        ? '855px'
        : state === 'main Edit'
        ? '855px'
        : state === 'main Reply'
        ? '766px'
        : state === 'main Reply Edit'
        ? '790px'
        : state === 'Reply Reply'
        ? '701px'
        : '790px'};
  }
  display: flex;
  align-items: flex-end;
`;

const CmntBtnBox = styled.div`
  display: flex;
  @media (max-width: 612px) {
    margin: ${({ state }) =>
      state === 'main'
        ? '0px'
        : state === 'main Edit'
        ? '0px'
        : state === 'main Reply'
        ? '5px 0 0 103px'
        : state === 'main Reply Edit'
        ? '5px 0 0 127px'
        : state === 'Reply Reply'
        ? '5px 0 0 37px'
        : '5px 0 0 127px'};
  }
`;

const CmntBtn = styled.button`
  width: 28px;
  padding: 0;
  margin-left: 17px;
`;
