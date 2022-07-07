import React, { useState, useEffect } from 'react';
import PostTagPresenter from './PostTag.style';

function PostTag({ register, setValue, watch, errors }) {
  const [text, setText] = useState('');
  const preValue = watch('tagArray');

  useEffect(() => {
    register('tagArray', { required: true });
  }, [register]);

  const handleInputReset = () => {
    setText('');
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 188 || (e.keyCode === 13 && e.target.value !== '')) {
      const tagText = text.split(',')[0];
      if (!preValue.includes(tagText)) {
        setValue('tagArray', [...preValue, tagText]);
        setText('');
      } else {
        setText('');
      }
    }
  };

  const handleTagWrite = (e) => {
    setText(e.target.value);
  };

  const handleTagDelete = (tag) => {
    const newHashTagArray = preValue.filter((el) => el !== tag);
    setValue('tagArray', [...newHashTagArray]);
    setText('');
  };

  return (
    <PostTagPresenter
      preValue={preValue}
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
