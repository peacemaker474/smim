import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postCommentCreate } from '../../../../network/comment/http';
import { getCookie } from '../../../../utils/cookie';
import { createComment } from '../../../../redux/slice/commentSlice';
import CommentInputPresenter from './CommentInput.style';

export default function CommentInput({
  postId,
  parentId,
  groupId,
  handleClickShow,
  isTargetVisible,
}) {
  const loginState = useSelector((state) => state.user);
  const [inputText, setInputText] = useState('');
  const inputRef = useRef('');
  const tkn = getCookie('users');
  const dispatch = useDispatch();

  useEffect(() => {
    if (isTargetVisible) {
      inputRef.current && inputRef.current.focus();
    }
  }, [isTargetVisible]);

  const handleCommentCreate = async (e) => {
    e.preventDefault();
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
        createComment(
          response.data.comment_id,
          {
            userId: loginState.id,
            nickname: loginState.name,
          },
          date,
          parentId,
          groupId,
          postId,
          inputText
        )
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
      ref={inputRef}
    />
  );
}
