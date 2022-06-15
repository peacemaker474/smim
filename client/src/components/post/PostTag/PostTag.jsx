import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { tagAdd, tagDelete } from '../../../redux/slice/postCreateSlice';
import { resetCheck } from '../../../redux/slice/postFormCheckSlice';
import PostTagPresenter from './PostTag.style';

function PostTag() {
  const [text, setText] = useState('');
  const { hashtag } = useSelector((state) => state.postCreate);
  const postCheck = useSelector((state) => state.postFormCheck);
  const dispatch = useDispatch();
  const tagInput = useRef();

  useEffect(() => {
    if (postCheck.hashtag) {
      // when hashtag state is false
      tagInput.current && tagInput.current.focus();
      dispatch(resetCheck());
    }
  }, [postCheck.hashtag, dispatch]);

  const handleKeyUp = (e) => {
    if (e.keyCode === 188 || (e.keyCode === 13 && e.target.value !== '')) {
      const tagText = text.split(',')[0];
      if (!hashtag.includes(tagText)) {
        dispatch(tagAdd(tagText));
      }
      setText('');
    }
  };

  const handleTagWrite = (e) => {
    setText(e.target.value);
  };

  const handleInputReset = () => {
    // input text reset
    setText('');
  };

  const handleTagDelete = (el) => {
    dispatch(tagDelete(el));
  };

  return (
    <PostTagPresenter
      hashtag={hashtag}
      handleTagDelete={handleTagDelete}
      handleKeyUp={handleKeyUp}
      handleTagWrite={handleTagWrite}
      handleInputReset={handleInputReset}
      text={text}
      tagInput={tagInput}
    />
  );
}

export default PostTag;
