import React, { useState, useEffect } from 'react';
import PostTagPresenter from './PostTag.style';

function PostTag({ register, setValue, watch, errors, clearErrors, setError }) {
  const [text, setText] = useState('');
  const tagArray = watch('tagArray');

  useEffect(() => {
    register('tagArray', { required: true });
  }, [register]);

  const handleInputReset = () => {
    setText('');
    if (watch('tagArray').length === 0) {
      setError('tagArray', { required: true });
    }
  };

  const handleKeyUp = (e) => {
    const reg = /[^\wㄱ-힣]/g;

    if (reg.exec(e.target.value)) {
      setText(e.target.value.replace(reg, ''));
    }

    if (e.keyCode === 188 || (e.keyCode === 32 && e.target.value !== '')) {
      const tagText = e.target.value.replace(reg, '');
      if (tagText.length === 0) {
        setText('');
      } else if (!tagArray.includes(tagText)) {
        setValue('tagArray', [...tagArray, tagText]);
        setText('');
        clearErrors('tagArray');
      } else {
        setText('');
      }
    }
  };

  const handleTagWrite = (e) => {
    setText(e.target.value);
  };

  const handleTagDelete = (e) => {
    const tag = e.target.previousSibling.innerText;
    const newHashTagArray = tagArray.filter((el) => el !== tag);
    setValue('tagArray', [...newHashTagArray]);
    setText('');
    if (watch('tagArray').length === 0) {
      setError('tagArray', { required: true });
    }
  };

  const handleDeleteBtnClick = (el) => {
    handleTagDelete(el);
  };

  return (
    <PostTagPresenter
      tagArray={tagArray}
      onDeleteBtnClick={handleDeleteBtnClick}
      onKeyUp={handleKeyUp}
      onTagWrite={handleTagWrite}
      onInputReset={handleInputReset}
      text={text}
      errors={errors}
    />
  );
}

export default PostTag;
