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
    if (e.keyCode === 188 || (e.keyCode === 13 && e.target.value !== '')) {
      const tagText = text.split(',')[0];
      console.log(tagText.length);
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

  const handleTagDelete = (tag) => {
    const newHashTagArray = tagArray.filter((el) => el !== tag);
    setValue('tagArray', [...newHashTagArray]);
    setText('');
    if (watch('tagArray').length === 0) {
      setError('tagArray', { required: true });
    }
  };

  return (
    <PostTagPresenter
      tagArray={tagArray}
      handleTagDelete={handleTagDelete}
      handleKeyUp={handleKeyUp}
      handleTagWrite={handleTagWrite}
      handleInputReset={handleInputReset}
      text={text}
      errors={errors}
    />
  );
}

export default PostTag;
