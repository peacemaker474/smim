import React, { useRef } from 'react';
import styled from 'styled-components';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface TextAreaProps {
  onKeyDownCheck: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  value: string;
  groupId: string;
  parentId: string;
  id: string;
  writer: string;
}

function TextArea({ onKeyDownCheck, register, setValue, value, groupId, parentId, id, writer }: TextAreaProps) {
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

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue('comment', e.target.value);
  };

  const { ref: registerRef } = register('comment');

  //   useEffect(() => {
  //     register('comment', { required: true });
  //     inputRef.current.style.height = '27px';
  //     const scrollHeight = inputRef.current.scrollHeight;
  //     inputRef.current.style.height = scrollHeight + 'px';
  //   }, [value, register]);

  const settingRegisterRef = (e: any) => {
    registerRef(e);
    inputRef.current = e;
  };

  return (
    <TextareaBox
      //   type="submit"
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
  border-bottom: 1px solid ${({ theme }) => theme.color.lightGray};
  outline: none;
  resize: none;
  overflow: hidden;
  font-size: 13px;
  line-height: 19px;
`;
