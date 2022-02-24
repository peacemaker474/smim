import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { targetAgeAdd } from '../../redux/post/action';

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
  const dispatch = useDispatch(); // dispatch 사용하기 위한 준비
  const targetAge = useSelector((state) => state.postReducer.targetAge);

  const titleHandler = (e) => {
    // store에 있는 state 바꾸는 함수 설정
    dispatch(targetAgeAdd(e.target.value));
  };

  console.log(targetAge); // store에 접근하여 state 가져오기

  return (
    <TargetWrap>
      <TargetAgeInput palette='yellow' onChange={titleHandler}>
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
