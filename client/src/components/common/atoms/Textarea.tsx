import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface TextAreaProps {
  onKeyDownCheck: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  value: string;
  groupId: string | null | undefined;
  parentId: string | null;
  id: string | undefined;
}

function TextArea({ onKeyDownCheck, register, setValue, value, groupId, parentId, id }: TextAreaProps) {
  const inputRef = useRef<HTMLTextAreaElement>(); // 값 설정하게 되면 읽기전용이 됨

  const STATE = 'main';

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue('comment', e.target.value);
  };

  const { ref: registerRef } = register('comment');

  const settingRegisterRef = (e: any) => {
    registerRef(e);
    inputRef.current = e;
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
      state={STATE}
    />
  );
}
export default TextArea;

const TextareaBox = styled.textarea<{ state: string }>`
  width: 745px;
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
