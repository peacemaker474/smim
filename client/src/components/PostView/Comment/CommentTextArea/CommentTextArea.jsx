import React, { useEffect, useRef } from 'react';
import CommentTextAreaPresenter from './CommentTextArea.style';

export default function CommentTextArea({
  handleloginCheck,
  handleKeyDownCheck,
  register,
  setValue,
  value,
  groupId,
  id,
}) {
  const ref = useRef();

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
  }, [value]);

  return (
    <CommentTextAreaPresenter
      registerRef={registerRef}
      inputRef={ref}
      value={value}
      handleCommentChange={handleCommentChange}
      handleloginCheck={handleloginCheck}
      handleKeyDownCheck={handleKeyDownCheck}
      groupId={groupId}
      id={id}
    />
  );
}
