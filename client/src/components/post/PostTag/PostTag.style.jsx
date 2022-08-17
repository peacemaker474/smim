import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import DelBtn from '../../../asset/icon/icon-del.svg';

function PostTagPresenter({
  tagArray,
  onTagDelete,
  onKeyUp,
  onTagWrite,
  onInputReset,
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
              <HashDelBtn type='button' onClick={() => onTagDelete(el)}></HashDelBtn>
            </HashItem>
          ))}
      </HashWrapBox>
      <HashInput
        type='text'
        placeholder='해시태그를 입력해주시고 콤마로 구분해주세요'
        onKeyUp={onKeyUp}
        onChange={onTagWrite}
        onBlur={onInputReset}
        value={text}
        maxLength='10'
      />
    </HashContainer>
  );
}

export default PostTagPresenter;

const HashContainer = styled.div`
  height: auto;
  margin-top: 30px;
  padding: 5px;
  color: rgb(52, 58, 64);
  font-size: 1.125rem;
  display: flex;
  flex-wrap: wrap;
  letter-spacing: -0.6px;
  color: #444241;
  border: 2px solid
    ${({ palette, theme, error }) => (error ? theme.color['lightGray'] : theme.color[palette])};
  @media screen and (max-width: 1200px) {
    display: block;
  }
`;

const HashWrapBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const HashItem = styled.div`
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  background: ${theme.color['yellow']};
  color: ${theme.color['navy']};
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
`;

const HashInput = styled.input`
  display: block;
  outline: none;
  cursor: text;
  margin: 5px;
  border: none;
  min-width: 300px;
  width: 90%;
`;

const HashDelBtn = styled.button`
  width: 8px;
  height: 8px;
  background: url(${DelBtn});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;
