import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostWriteBtnPresenter from './PostWriteBtn.style';

function PostWriteBtn() {
  const navigate = useNavigate();
  const handleBtnClick = () => {
    navigate('/posts/create');
  };
  return <PostWriteBtnPresenter handleBtnClick={handleBtnClick} />;
}

export default PostWriteBtn;
