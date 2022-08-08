import React, { useEffect, useRef } from 'react';
import CommentTextAreaPresenter from './CommentTextArea.style';

export default function CommentTextArea({
  handleloginCheck,
  handleKeyDownCheck,
  register,
  setValue,
  value,
  groupId,
  parentId,
  id,
  writer,
}) {
  const ref = useRef();

  let STATE = '';
  if (parentId == null && !id) {
    STATE = 'main';
  } else if (parentId == null && id) {
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

  const handleCommentChange = (event) => {
    const v = event.target.value;
    setValue('comment', v);
  };

  const { ref: registerRef } = register('comment');

  useEffect(() => {
    // textarea scroll height 설정
    register('comment', { required: true });
    ref.current.style.height = '27px';
    const scrollHeight = ref.current.scrollHeight;
    ref.current.style.height = scrollHeight + 'px';
  }, [value, register]);

  return (
    <CommentTextAreaPresenter
      registerRef={registerRef}
      inputRef={ref}
      value={value}
      handleCommentChange={handleCommentChange}
      handleloginCheck={handleloginCheck}
      handleKeyDownCheck={handleKeyDownCheck}
      state={STATE}
    />
  );
}
