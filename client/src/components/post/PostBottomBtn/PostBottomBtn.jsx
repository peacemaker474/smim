import React from 'react';
import { useDispatch } from 'react-redux';
import PostBottomBtnPresenter from './PostBottomBtn.style';
import { modalToggle } from '../../../redux/slice/toggleSlice';

function PostBottomBtn({ formState }) {
  const dispatch = useDispatch();

  const handleFormCancle = () => {
    dispatch(modalToggle());
  };

  return (
    <PostBottomBtnPresenter
      formState={formState}
      onFormCancle={handleFormCancle}
    />
  );
}

export default PostBottomBtn;
