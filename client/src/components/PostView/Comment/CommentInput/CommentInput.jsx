import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postCommentCreate } from '../../../../network/comment/http';
import { getCookie } from '../../../../utils/cookie';
import { createComment } from '../../../../redux/slice/commentSlice';
import CommentInputPresenter from './CommentInput.style';

export default function CommentInput({ postId, parentId, groupId, handleClickShow }) {
  const loginState = useSelector((state) => state.login);
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

    if (response.data.success) {
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
          group_id: groupId,
          post_id: postId,
        })
      );
    } else {
      console.log(response.data.success);
    }
    inputRef.current.value = '';
    if (parentId) {
      handleClickShow(false);
    }
  };

  const handleCommentWrite = (e) => {
    setInputText(e.target.value);
  };

  return (
    <CommentInputPresenter
      handleCommentCreate={handleCommentCreate}
      handleCommentWrite={handleCommentWrite}
      loginState={loginState}
      inputText={inputText}
      inputRef={inputRef}
    />
  );
}
