import React from 'react';
import styled from 'styled-components';
import { ChangePwBtn, CancelBtn } from '../../../styles/common/buttons';
import { MyInfoInput } from '../../../styles/common/input';

const PasswordWrapper = styled.form`
  width: 50vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const PasswordTitle = styled.h2`
  width: 70%;
  height: 70px;
  line-height: 70px;
  font-size: 28px;
  font-weight: bold;
`;

const PasswordBox = styled.div`
  width: 70%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: space-evenly;
  gap: 20px;
`;

function PasswordChangeStyle ({ onInputChange, onPwSubmit }) {
  return (
    <PasswordWrapper>
      <PasswordTitle> 비밀번호 변경 </PasswordTitle>
      <PasswordBox>
        <MyInfoInput name="oldPassword" type="password" placeholder="현재 비밀번호" onBlur={onInputChange} />
        <MyInfoInput name="newPassword" type="password" placeholder='새 비밀번호' onBlur={onInputChange} />
        <MyInfoInput name="newPassword2" type="password" placeholder='새 비밀번호 확인' onBlur={onInputChange} />
      </PasswordBox>
      <ChangePwBtn onClick={onPwSubmit}> 확인 </ChangePwBtn>
      <CancelBtn> 취소 </CancelBtn>
    </PasswordWrapper>
  );
}

export default PasswordChangeStyle;