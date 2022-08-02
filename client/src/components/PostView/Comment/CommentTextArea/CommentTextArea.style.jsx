import React from 'react';
import styled from 'styled-components';

export default function CommentTextAreaPresenter({
  registerRef,
  inputRef,
  value,
  handleCommentChange,
  handleloginCheck,
  handleKeyDownCheck,
  groupId,
  id,
}) {
  return (
    <Textarea
      type='submit'
      placeholder='답변을 기다립니다.'
      ref={(e) => {
        registerRef(e);
        inputRef.current = e;
      }}
      value={value}
      onChange={handleCommentChange}
      onClick={handleloginCheck}
      onKeyDown={handleKeyDownCheck}
      groupId={groupId}
      id={id}
    />
  );
}

const Textarea = styled.textarea`
  @media (max-width: 612px) {
    width: ${({ groupId, id }) => (!groupId ? '64%' : groupId === id ? '79%' : '29%')};
  }

  @media (min-width: 612px) and (max-width: 768px) {
    width: ${({ groupId, id }) => (!groupId ? '79%' : groupId === id ? '79%' : '68%')};
  }

  @media (min-width: 768px) and (max-width: 992px) {
    width: ${({ groupId, id }) => (!groupId ? '85%' : groupId === id ? '85%' : '79%')};
  }

  @media (min-width: 992px) and (max-width: 1200px) {
    width: ${({ groupId, id }) => (!groupId ? '87%' : groupId === id ? '87%' : '83%')};
  }

  @media (min-width: 1200px) {
    width: ${({ groupId, id }) => (!groupId ? '90%' : groupId === id ? '90%' : '85%')};
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
