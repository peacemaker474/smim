import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import DelBtn from '../../asset/icon/icon-del.svg';
import { useSelector, useDispatch } from 'react-redux';
import { tagAdd, tagDelete } from '../../redux/post/action';
import { resetCheck } from '../../redux/postForm/action';

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
  min-width: 20rem;
  border: none;
`;

const HashDelBtn = styled.button`
  width: 8px;
  height: 8px;
  background: url(${DelBtn});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

function PostTag() {
  const [text, setText] = useState('');
  const { hashtag } = useSelector((state) => state.postReducer);
  const postCheck = useSelector((state) => state.postFormReducer);
  const dispatch = useDispatch();
  const tagInput = useRef();
  console.log('rendering check');
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

  const handleTextWrite = (e) => {
    setText(e.target.value);
  };

  const handleTagFocusOut = () => {
    // input text reset
    setText('');
  };

  const handleDeleteBtnClick = (el) => {
    dispatch(tagDelete(el));
  };

  return (
    <HashContainer palette='yellow'>
      <HashWrapBox>
        {hashtag.map((el, idx) => (
          <HashItem key={idx + el}>
            <span>{el}</span>
            <HashDelBtn type='button' onClick={() => handleDeleteBtnClick(el)}></HashDelBtn>
          </HashItem>
        ))}
      </HashWrapBox>
      <HashInput
        type='text'
        placeholder='해시태그를 입력해주시고 콤마로 구분해주세요'
        onKeyUp={handleKeyUp}
        onChange={handleTextWrite}
        onBlur={handleTagFocusOut}
        value={text}
        ref={tagInput}
      />
    </HashContainer>
  );
}

export default PostTag;
