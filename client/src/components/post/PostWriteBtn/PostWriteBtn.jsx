import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoginCheckToggle } from '../../../redux/slice/toggleSlice';
import PostWriteBtnPresenter from './PostWriteBtn.style';

function PostWriteBtn() {
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleBtnClick = () => {
    if (loginState.isLogin) {
      navigate('/post/create');
    } else {
      dispatch(isLoginCheckToggle());
    }
  };
  return <PostWriteBtnPresenter handleBtnClick={handleBtnClick} />;
}

export default PostWriteBtn;
