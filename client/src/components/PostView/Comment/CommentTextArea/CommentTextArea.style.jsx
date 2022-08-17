import React from 'react';
import styled from 'styled-components';

export default function CommentTextAreaPresenter({
  value,
  onCommentChange,
  onKeyDownCheck,
  state,
  settingRegisterRef,
}) {
  return (
    <Textarea
      type='submit'
      placeholder='답변을 기다립니다.'
      ref={settingRegisterRef}
      value={value}
      onChange={onCommentChange}
      onKeyDown={onKeyDownCheck}
      state={state}
    />
  );
}

const Textarea = styled.textarea`
  @media (max-width: 612px) {
    width: ${({ state }) =>
      state === 'main'
        ? '173px'
        : state === 'main Edit'
        ? '173px'
        : state === 'main Reply'
        ? '173px'
        : state === 'main Reply Edit'
        ? '198px'
        : state === 'Reply Reply'
        ? '108px'
        : '198px'};
  }

  @media (min-width: 612px) and (max-width: 768px) {
    width: ${({ state }) =>
      state === 'main'
        ? '350px'
        : state === 'main Edit'
        ? '350px'
        : state === 'main Reply'
        ? '264px'
        : state === 'main Reply Edit'
        ? '286px'
        : state === 'Reply Reply'
        ? '198px'
        : '286px'};
  }

  @media (min-width: 768px) and (max-width: 992px) {
    width: ${({ state }) =>
      state === 'main'
        ? '485px'
        : state === 'main Edit'
        ? '485px'
        : state === 'main Reply'
        ? '396px'
        : state === 'main Reply Edit'
        ? '420px'
        : state === 'Reply Reply'
        ? '331px'
        : '420px'};
  }

  @media (min-width: 992px) and (max-width: 1200px) {
    width: ${({ state }) =>
      state === 'main'
        ? '615px'
        : state === 'main Edit'
        ? '615px'
        : state === 'main Reply'
        ? '526px'
        : state === 'main Reply Edit'
        ? '550px'
        : state === 'Reply Reply'
        ? '462px'
        : '550px'};
  }

  @media (min-width: 1200px) {
    width: ${({ state }) =>
      state === 'main'
        ? '745px'
        : state === 'main Edit'
        ? '745px'
        : state === 'main Reply'
        ? '656px'
        : state === 'main Reply Edit'
        ? '680px'
        : state === 'Reply Reply'
        ? '591px'
        : '680px'};
  }
  margin-left: 20px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};
  outline: none;
  resize: none;
  overflow: hidden;
  font-size: 13px;
  line-height: 19px;
`;
