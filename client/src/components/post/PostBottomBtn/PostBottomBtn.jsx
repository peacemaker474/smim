import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PostBottomBtnPresenter from './PostBottomBtn.style';
import { modalToggle } from '../../../redux/slice/toggleSlice';

function PostBottomBtn({ formState, onSubmit }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormCancle = () => {
    navigate(-1);
  };

  const handleSubmit = onSubmit(() => {
    dispatch(modalToggle());
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
