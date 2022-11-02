import { useState } from 'react';
// import { UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import DelBtn from '../../../asset/icons/icon-del.svg';

// interface TagInputProps {
//   setValue: UseFormRegister<any>;
//   clearErrors: UseFormRegister<any>;
// }

function TagInput() {
  const [text, setText] = useState('');
  const tagArray: Array<string> = []; // watch('tagArray');

  //   const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
  //     const reg = /[^\wㄱ-힣]/g;

  //     if (reg.exec(e.target?.value)) {
  //       setText(e.target?.value.replace(reg, ''));
  //     }

  //     if (e.keyCode === 188 || (e.keyCode === 32 && e.target.value !== '')) {
  //       const tagText = e.target.value.replace(reg, '');
  //       if (tagText.length === 0) {
  //         setText('');
  //       } else if (!tagArray.includes(tagText)) {
  //         setValue('tagArray', [...tagArray, tagText]);
  //         setText('');
  //         clearErrors('tagArray');
  //       } else {
  //         setText('');
  //       }
  //     }
  //   };

  return (
    <HashContainer error={false}>
      <HashWrapBox>
        {tagArray &&
          tagArray.map((el) => (
            <HashItem key={el}>
              <span>{el}</span>
              <HashDelBtn
                type="button"
                //   onClick={onDeleteBtnClick}
              ></HashDelBtn>
            </HashItem>
          ))}
      </HashWrapBox>
      <HashInput
        type="text"
        placeholder="해시태그를 입력해주시고 콤마로 구분해주세요"
        // onKeyUp={handleKeyUp}
        // onChange={onTagWrite}
        // onBlur={onInputReset}
        value={text}
        maxLength={10}
      />
    </HashContainer>
  );
}

export default TagInput;

const HashContainer = styled.div<{ error: boolean }>`
  height: auto;
  margin-top: 30px;
  padding: 5px;
  color: rgb(52, 58, 64);
  font-size: 1.125rem;
  display: flex;
  flex-wrap: wrap;
  letter-spacing: -0.6px;
  color: #444241;
  border: 2px solid ${({ theme, error }) => (error ? theme.color.lightGray : theme.color.yellow)};
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
