import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface TextAreaProps {
  onKeyDownCheck: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  value: string;
}

function TextArea({ onKeyDownCheck, register, setValue, value }: TextAreaProps) {
  const inputRef = useRef<HTMLTextAreaElement>(); // 값 설정하게 되면 읽기전용이 됨

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue('comment', e.target.value);
  };

  const { ref: registerRef } = register('comment');

  const settingRegisterRef = (e: null | HTMLTextAreaElement) => {
    registerRef(e);
    if (e) inputRef.current = e;
  };

  useEffect(() => {
    register('comment', { required: true });
    if (inputRef.current) {
      inputRef.current.style.height = '27px';
      const { scrollHeight } = inputRef.current;
      inputRef.current.style.height = `${scrollHeight}px`;
    }
  }, [value, register]);

  return (
    <TextareaBox
      placeholder="답변을 기다립니다."
      ref={settingRegisterRef}
      value={value}
      onChange={handleCommentChange}
      onKeyDown={onKeyDownCheck}
    />
  );
}
export default TextArea;

const TextareaBox = styled.textarea`
  width: 100%;
  height: 26px;
  margin-left: 20px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.lightGray};
  outline: none;
  resize: none;
  overflow: hidden;
  font-size: 13px;
  line-height: 19px;
`;
