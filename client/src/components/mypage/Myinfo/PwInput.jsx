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


function PwInput ({onInputChange}) {
  return (
    <PwBox>
      <MyInfoInput name="oldPassword" type="password" placeholder="현재 비밀번호" onBlur={onInputChange} />
      <MyInfoInput name="newPassword" type="password" placeholder='새 비밀번호' onBlur={onInputChange} />
      <MyInfoInput name="newPassword2" type="password" placeholder='새 비밀번호 확인' onBlur={onInputChange} />
    </PwBox>
  );
}

export default PwInput;