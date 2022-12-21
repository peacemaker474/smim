import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FieldError } from 'react-hook-form';
import useText from '../../../hooks/useText';
import { PostCreateProps } from '../../../type/formTypes';
import { theme } from '../../../styles/theme';
import DelBtn from '../../../asset/icons/icon-del.svg';

function TagInput({ setValue, clearErrors, watch, register, setError, errors }: PostCreateProps) {
  const [text, setText, handleTextWrite] = useText();
  const tagArray = watch('tagArray');

  useEffect(() => {
    register('tagArray', { required: '태그를 입력해주세요' });
  }, [register]);

  const handleInputReset = () => {
    setText('');
    if (watch('tagArray').length === 0) {
      setError('tagArray', {
        types: {
          required: true,
        },
      });
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const reg = /[^\wㄱ-힣]/g;
    if (reg.exec(e.key)) {
      setText(e.key.replace(reg, ''));
    }

    if (e.code === 'Comma' || (e.code === 'Space' && e.key !== '')) {
      const tagText = text.replace(reg, '');
      if (!tagText.length) {
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

  const handleTagDelete = (e: React.MouseEvent<HTMLElement>) => {
    const tag = (e.target as Element).previousElementSibling?.innerHTML;
    const newHashTagArray = tagArray.filter((el: string) => el !== tag);
    setValue('tagArray', [...newHashTagArray]);
    setText('');
    if (watch('tagArray').length === 0) {
      setError('tagArray', {
        types: {
          required: true,
        },
      });
    }
  };

  return (
    <HashContainer errors={errors}>
      <HashWrapBox>
        {tagArray &&
          tagArray.map((el: string) => (
            <HashItem key={el}>
              <span>{el}</span>
              <HashDelBtn type="button" onClick={handleTagDelete} />
            </HashItem>
          ))}
      </HashWrapBox>
      <HashInput
        type="text"
        placeholder="해시태그를 입력해주시고 콤마로 구분해주세요"
        onKeyUp={handleKeyUp}
        onChange={handleTextWrite}
        onBlur={handleInputReset}
        value={text}
        maxLength={10}
      />
    </HashContainer>
  );
}

export default TagInput;

const HashContainer = styled.div<{ errors: FieldError | undefined }>`
  height: auto;
  margin-top: 30px;
  padding: 5px;
  color: rgb(52, 58, 64);
  font-size: 1.125rem;
  display: flex;
  flex-wrap: wrap;
  letter-spacing: -0.6px;
  color: #444241;
  border: 2px solid ${({ theme }) => theme.color.yellow};
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
  background: ${theme.color.yellow};
  color: ${theme.color.navy};
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
