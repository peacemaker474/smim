import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { postCommentCreate, putCommentEdit } from '../../../../network/comment/http';
import { createComment } from '../../../../redux/slice/commentCreateSlice';
import CommentInputPresenter from './CommentInput.style';
import { isLoginCheckToggle } from '../../../../redux/slice/toggleSlice';

export default function CommentInput({
  postId,
  parentId,
  groupId,
  isTargetVisible,
  handleClickCancel = undefined,
  handleTextChange,
  id,
  main,
  changedText,
}) {
  const loginState = useSelector((state) => state.user);
  const { register, handleSubmit, setValue, setFocus, watch } = useForm();
  const tkn = useSelector((state) => state.authToken).accessToken;
  const dispatch = useDispatch();
  let data = watch('comment');
  const inputRef = useRef();

  if (!handleClickCancel) {
    handleClickCancel = () => setValue('comment', '');
  }

  const onSubmit = (data, e) => {
    e.preventDefault();
    const addData = data.comment.replaceAll('\n', '<br>');
    console.log(addData);

    if (tkn) {
      if (id) {
        handleCommentEdit(e, addData);
      } else {
        handleCommentCreate(e, addData);
      }
      setValue('comment', '');
    }
  };

  useEffect(() => {
    if (isTargetVisible) {
      setFocus('comment');
      setValue('comment', changedText);
    }
  }, [isTargetVisible, setFocus]);

  const handleCommentCreate = async (e, data) => {
    const response = await postCommentCreate(
      { post_id: postId, content: data, parent_id: parentId },
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
            imageUrl: loginState.imgUrl,
          },
          date,
          parentId,
          groupId,
          postId,
          data
        )
      );
      if (parentId) {
        handleClickCancel(e);
      }
    } else {
      console.log(response.data.success);
    }
  };

  const handleCommentEdit = async (e, data) => {
    const response = await putCommentEdit(
      id,
      { post_id: postId, content: data },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tkn}`,
        },
      }
    );

    if (response.data.success) {
      handleTextChange(data.replace('<br>', '\n'));
      handleClickCancel(e);
    } else {
      console.log(response.data.success);
    }
  };

  const loginCheck = (e) => {
    e.preventDefault();
    if (!tkn) {
      e.target.disabled = true;
      dispatch(isLoginCheckToggle());
    }
  };

  const keyDownCheck = (e) => {
    if (e.keyCode === 13 && e.shiftKey === true) {
      e.preventDefault();
      setValue('comment', data + '\n');
    }
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit(onSubmit(watch(), e));
    }
  };
  return (
    <CommentInputPresenter
      loginState={loginState}
      handleSubmit={handleSubmit}
      register={register}
      handleClickCancel={handleClickCancel}
      id={id}
      onSubmit={onSubmit}
      loginCheck={loginCheck}
      isLogin={tkn}
      groupId={groupId}
      parentId={parentId}
      main={main}
      keyDownCheck={keyDownCheck}
      inputRef={inputRef}
    />
  );
}
