import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { postCommentCreate, putCommentEdit } from '../../../../network/comment/http';
import { createComment } from '../../../../redux/slice/commentCreateSlice';
import CommentFormPresenter from './CommentForm.style';

export default function CommentForm({
  postId,
  parentId,
  groupId,
  isTargetVisible,
  onFormInputCancel = null,
  onTextChange,
  id,
  changedText,
  writer,
}) {
  const loginState = useSelector((state) => state.user);
  const { accessToken } = useSelector((state) => state.authToken);
  const { register, handleSubmit, setValue, setFocus, watch } = useForm();
  const dispatch = useDispatch();
  let data = watch('comment');

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

  if (!onFormInputCancel) {
    onFormInputCancel = () => setValue('comment', '');
  }

  const handleCommentTextareaSubmit = (data, e) => {
    e.preventDefault();
    const addData = data.comment.replaceAll('\n', '<br>');

    if (accessToken) {
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
  }, [isTargetVisible, setFocus, changedText, setValue]);

  const handleCommentCreate = async (e, data) => {
    const response = await postCommentCreate(
      { post_id: postId, content: data, parent_id: parentId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data.success) {
      dispatch(
        createComment({
          _id: response.data.comment_id,
          writer: {
            userId: loginState.id,
            nickname: loginState.name,
            imageUrl: loginState.imgUrl,
          },
          parent_id: parentId,
          group_id: groupId,
          post_id: postId,
          text: data,
        })
      );
      if (parentId) {
        onFormInputCancel(e);
      }
    }
  };

  const handleCommentEdit = async (e, data) => {
    const response = await putCommentEdit(
      id,
      { post_id: postId, content: data },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data.success) {
      onTextChange(data.replace('<br>', '\n'));
      onFormInputCancel(e);
    }
  };

  const handleKeyDownCheck = (e) => {
    if (e.keyCode === 13 && e.shiftKey === true) {
      e.preventDefault();
      setValue('comment', data + '\n');
    }
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit(handleCommentTextareaSubmit(watch(), e));
    }
  };
  return (
    <CommentFormPresenter
      loginState={loginState}
      onSubmit={handleSubmit}
      onFormInputCancel={onFormInputCancel}
      onKeyDownCheck={handleKeyDownCheck}
      onCommentTextareaSubmit={handleCommentTextareaSubmit}
      register={register}
      setValue={setValue}
      value={data}
      groupId={groupId}
      parentId={parentId}
      id={id}
      writer={writer}
      state={STATE}
    />
  );
}
