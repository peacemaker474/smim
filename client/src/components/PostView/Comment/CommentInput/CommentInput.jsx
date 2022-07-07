import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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
  id,
}) {
  const loginState = useSelector((state) => state.user);
  const { register, handleSubmit, setValue, setFocus } = useForm();
  const tkn = useSelector((state) => state.authToken).accessToken;
  const dispatch = useDispatch();

  const onSubmit = (data, e) => {
    e.preventDefault();
    if (tkn) {
      if (id) {
        handleCommentEdit(data);
      } else {
        handleCommentCreate(data);
      }
      setValue('comment', '');
    }
  };

  useEffect(() => {
    if (isTargetVisible) {
      setFocus('comment');
    }
  }, [isTargetVisible, setFocus]);

  const handleCommentCreate = async (data) => {
    const response = await postCommentCreate(
      { post_id: postId, content: data.comment, parent_id: parentId },
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
          data.comment
        )
      );
      if (parentId) {
        handleClickCancel();
      }
    } else {
      console.log(response.data.success);
    }
  };

  const handleCommentEdit = async (data) => {
    const response = await putCommentEdit(
      id,
      { post_id: postId, content: data.comment },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tkn}`,
        },
      }
    );

    if (response.data.success) {
      console.log(response.data.success);
      handleTextChange(data.comment);
      handleClickCancel();
    } else {
      console.log(response.data.success);
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
    />
  );
}
