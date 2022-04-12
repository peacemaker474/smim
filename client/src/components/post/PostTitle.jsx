import React, { useRef } from 'react';
import styled from 'styled-components';

// PostTitle onChange할 때마다 focus를 잃는 현상 때문에 밖에 배치
const TitleWrap = styled.div`
  margin-top: 30px;
`;

const TitleInput = styled.input`
  width: 500px;
  height: 40px;
  border: 2px solid
    ${({ palette, theme }) => (palette ? theme.color[palette] : theme.color['black'])};
  border-radius: 3px;
  @media screen and (max-width: 550px) {
    width: 400px;
  }
`;

function PostTitle({ saveData }) {
  const titleInput = useRef();

  const titleHandler = () => {
    saveData('title', titleInput.current.value);
  };
  // ref 대신 value={title}을 쓰는 이유
  return (
    <TitleWrap>
      <TitleInput placeholder='제목' palette='yellow' onBlur={titleHandler} ref={titleInput} />
    </TitleWrap>
  );
}

export default PostTitle;
