import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostBottomBtnPresenter from './PostBottomBtn.style';

function PostBottomBtn({ formState }) {
  const navigate = useNavigate();

  const handleFormCancle = () => {
    navigate(-1);
  };

  return <PostBottomBtnPresenter formState={formState} handleFormCancle={handleFormCancle} />;
}

export default PostBottomBtn;
