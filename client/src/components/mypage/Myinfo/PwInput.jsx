import React from 'react';
import styled from 'styled-components';
import { MyInfoInput } from '../../../styles/common/input';

const PwBox = styled.div`
  width: 70%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: space-evenly;
  gap: 20px;
`;


function PwInput ({handleChangeInput}) {
  return (
    <PwBox>
      <MyInfoInput name="beforePw" type="password" placeholder="현재 비밀번호" onBlur={handleChangeInput} />
      <MyInfoInput name="afterPw" type="password" placeholder='새 비밀번호' onBlur={handleChangeInput} />
      <MyInfoInput name="afterPw2" type="password" placeholder='새 비밀번호 확인' onBlur={handleChangeInput} />
    </PwBox>
  );
}

export default PwInput;