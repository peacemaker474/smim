import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postCommentCreate, putCommentEdit } from '../../../../network/comment/http';
import { createComment } from '../../../../redux/slice/commentCreateSlice';
import CommentInputPresenter from './CommentInput.style';

export default function CommentInput({
  postId,
  parentId,
  groupId,
  isTargetVisible,
  handleClickCancel,
  handleTextChange,
  text = '',
  id,
}) {
  const loginState = useSelector((state) => state.user);
  const [inputText, setInputText] = useState(text);
  const inputRef = useRef('');
  const tkn = useSelector((state) => state.authToken).accessToken;
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
    inputRef.current.blur();
    if (parentId) {
      handleClickCancel();
    }
  };

  const handleCommentEdit = async (e) => {
    e.preventDefault();
    const response = await putCommentEdit(
      id,
      { post_id: postId, content: inputText },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tkn}`,
        },
      }
    );

    if (response.data.success) {
      console.log(response.data.success);
      handleTextChange(inputText);
    } else {
      console.log(response.data.success);
    }

    inputRef.current.value = '';
    handleClickCancel();
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
      handleClickCancel={() => {
        inputRef.current.value = '';
        handleClickCancel();
      }}
      handleCommentEdit={handleCommentEdit}
      id={id}
    />
  );
}
