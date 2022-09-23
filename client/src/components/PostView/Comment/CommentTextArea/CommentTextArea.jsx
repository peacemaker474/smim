import React, { useEffect, useRef } from 'react';
import CommentTextAreaPresenter from './CommentTextArea.style';

export default function CommentTextArea({
  onKeyDownCheck,
  register,
  setValue,
  value,
  groupId,
  parentId,
  id,
}) {
  const inputRef = useRef();

  let STATE = '';
  if (!parentId && !id) {
    STATE = 'main';
  } else if (!parentId && id) {
    STATE = 'main Edit';
  } else if (parentId === groupId && !id) {
    STATE = 'main Reply';
  } else if (parentId === groupId && id) {
    STATE = 'main Reply Edit';
  } else if (parentId !== groupId && id) {
    STATE = 'Reply Reply Edit';
  } else {
    STATE = 'Reply Reply';
  }

  const handleCommentChange = (e) => {
    setValue('comment', e.target.value);
  };

  const { ref: registerRef } = register('comment');

  useEffect(() => {
    register('comment', { required: true });
    inputRef.current.style.height = '27px';
    const scrollHeight = inputRef.current.scrollHeight;
    inputRef.current.style.height = scrollHeight + 'px';
  }, [value, register]);

  const settingRegisterRef = (e) => {
    registerRef(e);
    inputRef.current = e;
  };

  return (
    <CommentTextAreaPresenter
      value={value}
      onCommentChange={handleCommentChange}
      onKeyDownCheck={onKeyDownCheck}
      settingRegisterRef={settingRegisterRef}
      state={STATE}
    />
  );
}
