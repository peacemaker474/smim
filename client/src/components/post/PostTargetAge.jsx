import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { targetAgeAdd } from '../../redux/postCreate/action';
import { resetCheck } from '../../redux/postForm/action';

// PostTargetAge가 onChange할 때마다 focus를 잃는 현상 때문에 밖에 배치
const TargetWrap = styled.div`
  margin-top: 30px;
`;

const TargetAgeInput = styled.select`
  width: 250px;
  height: 40px;
  border: 2px solid
    ${({ palette, theme }) => (palette ? theme.color[palette] : theme.color['black'])};
  border-radius: 3px;
  @media screen and (max-width: 550px) {
    width: 400px;
  }
`;

function PostTargetAge() {
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.postCreateReducer);
  const postCheck = useSelector((state) => state.postFormReducer);
  const ageInput = useRef();

  useEffect(() => {
    if (postCheck.age) {
      // when targetAge state is false
      ageInput.current && ageInput.current.focus();
      console.log('나이를 입력해주세요'); // refactoring - 나중에 css 처리해야함
      dispatch(resetCheck());
    }
  }, [postCheck.age, dispatch]);

  const handleAgeSelect = (e) => {
    dispatch(targetAgeAdd(e.target.value));
  };

  return (
    <TargetWrap>
      <TargetAgeInput palette='yellow' onChange={handleAgeSelect} value={postData.targetAge}>
        <option value=''>질문하고 싶은 연령층을 선택해주세요.</option>
        <option value='10'>10대에게</option>
        <option value='20'>20대에게</option>
        <option value='30'>30대에게</option>
        <option value='40'>40대에게</option>
        <option value='50'>50대에게</option>
        <option value='60'>60대 이상에게</option>
      </TargetAgeInput>
    </TargetWrap>
  );
}

export default PostTargetAge;
