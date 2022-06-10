import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { titleAdd } from '../../../redux/postCreate/action';
import { resetCheck } from '../../../redux/postForm/action';
import PostTitlePresenter from './PostTitle.style';

function PostTitle() {
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.postCreateReducer);
  const postCheck = useSelector((state) => state.postFormReducer);
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
