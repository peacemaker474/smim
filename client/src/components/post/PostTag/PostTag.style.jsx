import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import DelBtn from '../../../asset/icon/icon-del.svg';

function PostTagPresenter({
  tagArray,
  handleTagDelete,
  handleKeyUp,
  handleTagWrite,
  handleInputReset,
  text,
  errors,
}) {
  return (
    <HashContainer error={errors.tagArray} palette='yellow'>
      <HashWrapBox>
        {tagArray &&
          tagArray.map((el, idx) => (
            <HashItem key={idx + el}>
              <span>{el}</span>
              <HashDelBtn type='button' onClick={() => handleTagDelete(el)}></HashDelBtn>
            </HashItem>
          ))}
      </HashWrapBox>
      <HashInput
        type='text'
        placeholder='해시태그를 입력해주시고 콤마로 구분해주세요'
        onKeyUp={handleKeyUp}
        onChange={handleTagWrite}
        onBlur={handleInputReset}
        value={text}
      />
    </HashContainer>
  );
}

export default PostTagPresenter;

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
    ${({ palette, theme, error }) => (error ? theme.color['lightGray'] : theme.color[palette])};
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
