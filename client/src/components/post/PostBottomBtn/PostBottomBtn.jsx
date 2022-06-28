import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postReset } from '../../../redux/slice/postCreateSlice';
import {
  titleCheck,
  ageCheck,
  hashtagCheck,
  contentCheck,
  resetCheck,
} from '../../../redux/slice/postFormCheckSlice';
import PostBottomBtnPresenter from './PostBottomBtn.style';
import { modalToggle } from '../../../redux/slice/toggleSlice';

function PostBottomBtn({ formState }) {
  const navigate = useNavigate();
  const postData = useSelector((state) => state.postCreate);
  const dispatch = useDispatch();

  const handleFormCheck = (data) => {
    if (data.title === '') {
      console.log('제목을 입력해주세요');
      dispatch(titleCheck());
    } else if (data.targetAge === '') {
      console.log('연령층을 선택해주세요');
      dispatch(ageCheck());
    } else if (data.hashtag.length === 0) {
      console.log('태그를 입력해주세요');
      dispatch(hashtagCheck());
    } else if (data.content === '') {
      console.log('내용을 입력해주세요');
      dispatch(contentCheck());
    } else {
      dispatch(resetCheck());
      dispatch(modalToggle());
    }
  };

  const handleFormCancle = () => {
    dispatch(postReset());
    dispatch(resetCheck());
    navigate(-1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleFormCheck(postData);
  };

  return (
    <PostBottomBtnPresenter
      formState={formState}
      handleFormCancle={handleFormCancle}
      handleFormSubmit={handleFormSubmit}
    />
  );
}

export default PostBottomBtn;
