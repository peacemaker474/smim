import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { useDispatch, useSelector } from 'react-redux';
import { tagAdd } from '../../redux/post/action';

const HashContainer = styled.div`
  height: 40px;
  margin-top: 30px;
  color: rgb(52, 58, 64);
  font-size: 1.125rem;
  display: flex;
  flex-wrap: wrap;
  letter-spacing: -0.6px;
  color: #444241;
  border: 2px solid
    ${({ palette, theme }) => (palette ? theme.color[palette] : theme.color['black'])};
  border-radius: 3px;
  padding: 2px 2px 2px 2px;
`;

const HashItem = styled.div`
  margin-top: 1px;
  width: auto;
  height: 30px;
  background: ${theme.color['yellow']};
  border-radius: 56px;
  padding: 5px;
  color: ${theme.color['navy']};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 15px;
  margin-right: 5px;
  cursor: pointer;
`;

const HashWrapBox = styled.div`
  height: 30px;
  display: flex;
  flex-wrap: wrap;
`;

const HashInput = styled.input`
  display: inline-flex;
  outline: none;
  cursor: text;
  line-height: 2rem;
  min-width: 8rem;
  border: none;
`;

function PostTag() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const hashtagArr = useSelector((state) => state.postReducer.hashArr);
  console.log(hashtagArr);

  const handleEnter = (e) => {
    if (e.keyCode === 13 && e.target.value !== '') {
      dispatch(tagAdd(e.target.value));
      setText('');
    }
  };

  const handleTextWrite = (e) => {
    setText(e.target.value);
  };

  const handleTagFocusOut = () => {
    // input text reset
    setText('');
  };

  return (
    <HashContainer palette='yellow'>
      <HashWrapBox>
        {hashtagArr.map((el, idx) => (
          <HashItem key={idx + el}>{el}</HashItem>
        ))}
      </HashWrapBox>
      <HashInput
        type='text'
        placeholder='해시태그 입력'
        onKeyUp={handleEnter}
        onChange={handleTextWrite}
        onBlur={handleTagFocusOut}
        value={text}
      />
    </HashContainer>
  );
}

export default PostTag;
