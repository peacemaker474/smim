import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { titleAdd } from '../../redux/post/action';
import { resetCheck } from '../../redux/postForm/action';

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

function PostTitle() {
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.postReducer);
  const postCheck = useSelector((state) => state.postFormReducer);
  const titleInput = useRef();

  useEffect(() => {
    if (postCheck.title) {
      // when title state is false
      titleInput.current && titleInput.current.focus();
      dispatch(resetCheck);
    }
  }, [postCheck.title, dispatch]);

  const handleInputChange = (e) => {
    dispatch(titleAdd(e.target.value));
  };

  // ref 대신 value={title}을 쓰는 이유
  return (
    <TitleWrap>
      <TitleInput
        placeholder='제목'
        palette='yellow'
        onChange={handleInputChange}
        value={postData.title}
        ref={titleInput}
      />
    </TitleWrap>
  );
}

export default PostTitle;
