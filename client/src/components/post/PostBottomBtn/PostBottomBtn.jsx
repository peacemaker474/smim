import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PostBottomBtnPresenter from './PostBottomBtn.style';
import { modalToggle } from '../../../redux/slice/toggleSlice';

function PostBottomBtn({ formState, handleSubmit }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFormCancle = () => {
    navigate(-1);
  };

  return (
    <PostBottomBtnPresenter
      formState={formState}
      handleFormCancle={handleFormCancle}
      handleSubmit={handleSubmit((data, e) => {
        e.preventDefault();
        console.log(data);
        dispatch(modalToggle());
      })}
    />
  );
}

export default PostBottomBtn;
