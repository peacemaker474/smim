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
  width: ${({ groupId, id }) => (!groupId ? '84%' : groupId === id ? '84%' : '83%')};
  margin-left: 20px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};
  outline: none;
  resize: none;
  overflow: hidden;
  font-size: 13px;
  line-height: 19px;
`;
