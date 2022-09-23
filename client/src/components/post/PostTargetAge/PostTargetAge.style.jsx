import React from 'react';
import styled from 'styled-components';

function PostTargetAgePresenter({ register, errors }) {
  return (
    <TargetWrap>
      <TargetAgeSelect
        palette='yellow'
        error={errors.age}
        {...register('age', { required: 'This is required' })}
      >
        <option value=''>질문하고 싶은 연령층을 선택해주세요.</option>
        <option value='10'>10대에게</option>
        <option value='20'>20대에게</option>
        <option value='30'>30대에게</option>
        <option value='40'>40대에게</option>
        <option value='50'>50대이상에게</option>
      </TargetAgeSelect>
    </TargetWrap>
  );
}

export default PostTargetAgePresenter;

// PostTargetAge가 onChange할 때마다 focus를 잃는 현상 때문에 밖에 배치
const TargetWrap = styled.div`
  margin-top: 30px;
`;

const TargetAgeSelect = styled.select`
  width: 250px;
  height: 40px;
  border: 2px solid
    ${({ palette, theme, error }) => (error ? theme.color['lightGray'] : theme.color[palette])};
  border-radius: 3px;
  @media screen and (max-width: 550px) {
    width: 100%;
    & > option {
      width: 100%;
    }
  }
`;
