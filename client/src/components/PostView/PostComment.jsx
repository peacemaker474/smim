import React, { useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import CommentItemBox from './CommentItemBox';

const CommentContainer = styled.div`
  width: 794px;
  height: 59px;
  margin: 0 auto;
`;

const CommentH2 = styled.h2`
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
  margin-bottom: 16px;
  &::after {
    width: 70px;
    height: 2px;
    background: #000000;
    display: block;
    content: '';
    margin-top: 9px;
  }
`;

const CommentInputBox = styled.div`
  width: 794px;
  height: 59px;
  border: 1px solid #c4c4c4;
  padding: 5px;
  margin-bottom: 25px;
`;

const CommentInput = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  resize: none;
  font-size: 13px;
`;

const CommentItemContainer = styled.div``;

export default function PostComment() {
  const inputRef = useRef(null);
  const [cmnt, setCmnt] = useState('');
  const handleTextPrint = (e) => {
    console.log(inputRef);
    setCmnt(e.target.value);
  };

  return (
    <>
      <CommentContainer>
        <CommentH2>답변하기</CommentH2>
        <CommentInputBox>
          <CommentInput
            type='text'
            placeholder='답변을 기다립니다.'
            ref={inputRef}
            onChange={handleTextPrint}
            value={cmnt}
          />
        </CommentInputBox>
        <CommentItemContainer>
          <CommentItemBox setCmnt={setCmnt} />
          <CommentItemBox setCmnt={setCmnt} />
        </CommentItemContainer>
      </CommentContainer>
    </>
  );
}
