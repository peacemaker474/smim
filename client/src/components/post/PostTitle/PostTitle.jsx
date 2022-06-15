import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { titleAdd } from '../../../redux/slice/postCreateSlice';
import { resetCheck } from '../../../redux/slice/postFormCheckSlice';
import PostTitlePresenter from './PostTitle.style';

function PostTitle() {
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.postCreate);
  const postCheck = useSelector((state) => state.postFormCheck);
  const titleInput = useRef();

  useEffect(() => {
    if (postCheck.title) {
      // when title state is false
      titleInput.current && titleInput.current.focus();
      dispatch(resetCheck);
    }
  }, [postCheck.title, dispatch]);

  const handleTitleWrite = (e) => {
    dispatch(titleAdd(e.target.value));
  };

  // ref 대신 value={title}을 쓰는 이유
  return (
    <PostTitlePresenter
      handleTitleWrite={handleTitleWrite}
      postData={postData}
      titleInput={titleInput}
    />
  );
}

export default PostTitle;
