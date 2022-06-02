import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { postCommentCreate } from '../../../network/comment/http';
import { getCookie } from '../../../utils/cookie';
import { createComment } from '../../../redux/comment/actions';

export default function CommentInput({ postId, parentId }) {
  const loginState = useSelector((state) => state.loginReducer);
  const [inputText, setInputText] = useState('');
  const inputRef = useRef('');
  const tkn = getCookie('users');
  const dispatch = useDispatch();

  const handleCommentCreate = async () => {
    const response = await postCommentCreate(
      { post_id: postId, content: inputText, parent_id: parentId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tkn}`,
        },
      }
    );

    const date = String(new Date());
    dispatch(
      createComment({
        text: inputText,
        _id: response.data.comment_id,
        createAt: date,
        writer: {
          userId: loginState.id,
          nickname: loginState.name,
        },
        parent_id: parentId,
      })
    );
    inputRef.current.value = '';
  };

  const handleCommentWrite = (e) => {
    setInputText(e.target.value);
  };

  return (
    <CmntInputBox>
      <CmntImg src={`http://localhost:4000/${loginState.imgUrl}`}></CmntImg>
      <CmntInput
        type='text'
        placeholder='답변을 기다립니다.'
        onChange={handleCommentWrite}
        value={inputText}
        ref={inputRef}
      />
      <CmntBtn onClick={handleCommentCreate}>게시</CmntBtn>
    </CmntInputBox>
  );
}

const CmntInputBox = styled.div`
  width: 794px;
  // height: 59px;
  // border: 1px solid #c4c4c4;
  margin-bottom: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CmntImg = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid #091d3e;
  margin-right: 11px;
  // background-image: url('${({ url }) => url}');
`;

const CmntInput = styled.input`
  width: 700px;
  height: 35px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};
  outline: none;
  resize: none;
  font-size: 13px;
`;

const CmntBtn = styled.button`
  width: 28px;
  padding: 0;
  margin-left: 17px;
`;
