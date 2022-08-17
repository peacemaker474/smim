import React from 'react';
import { useDispatch } from 'react-redux';
import PostBottomBtnPresenter from './PostBottomBtn.style';
import { postUploadToggle, modalToggle } from '../../../redux/slice/toggleSlice';

function PostBottomBtn({ formState, onSubmit }) {
  const dispatch = useDispatch();

  const handleFormCancle = () => {
    dispatch(modalToggle());
  };

  const handleSubmit = onSubmit(() => {
    dispatch(postUploadToggle());
  });

  return (
    <PostBottomBtnPresenter
      formState={formState}
      onFormCancle={handleFormCancle}
      onSubmit={handleSubmit}
    />
  );
}

export default PostBottomBtn;
