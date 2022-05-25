import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CommentItemBox from './CommentItemBox';
import { getCookie } from '../../../utils/cookie';
import { CommentCreate } from '../../../network/comment/http';

export default function PostComment() {
  const inputRef = useRef(null);
  const [cmnt, setCmnt] = useState('');
  const tkn = getCookie('users');
  const location = useLocation();
  const id = location.pathname.split('view/')[1];
  const loginState = useSelector((state) => state.loginReducer);

  const handleTextPrint = (e) => {
    console.log(inputRef);
    setCmnt(e.target.value);
  };

  const handlePostingClick = async () => {
    const response = await CommentCreate(
      {
        post_id: `${id}`,
        content: `${cmnt}`,
        parent_id: null,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tkn}`,
        },
      }
    );

    const data = response.data;
    console.log(data);
  };

  return (
    <>
      <CommentContainer>
        <CommentH2>답변하기</CommentH2>
        <CommentInputBox>
          <CommentImg url={loginState.imgUrl}></CommentImg>
          <CommentInput
            type='text'
            placeholder='답변을 기다립니다.'
            ref={inputRef}
            onChange={handleTextPrint}
            value={cmnt}
          />
          <CommentBtn onClick={handlePostingClick}>게시</CommentBtn>
        </CommentInputBox>
        <CommentItemContainer>
          <CommentItemBox setCmnt={setCmnt} />
          <CommentItemBox setCmnt={setCmnt} />
        </CommentItemContainer>
      </CommentContainer>
    </>
  );
}

const CommentContainer = styled.div`
  width: 794px;
  // height: 59px;
  margin: 20px auto;
`;

const CommentH2 = styled.h2`
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
  margin-bottom: 28px;
  // &::after {
  //   width: 70px;
  //   height: 2px;
  //   background: #000000;
  //   display: block;
  //   content: '';
  //   margin-top: 9px;
  // }
`;

const CommentInputBox = styled.div`
  width: 794px;
  // height: 59px;
  // border: 1px solid #c4c4c4;
  margin-bottom: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CommentImg = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid #091d3e;
  margin-right: 11px;
`;

const CommentInput = styled.input`
  width: 700px;
  height: 35px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};
  outline: none;
  resize: none;
  font-size: 13px;
`;

const CommentBtn = styled.button`
  width: 28px;
  padding: 0;
  margin-left: 17px;
`;

const CommentItemContainer = styled.div``;
