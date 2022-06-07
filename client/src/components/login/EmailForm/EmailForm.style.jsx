import React from 'react';
import styled from 'styled-components';
import { LoginValid } from '../../../styles/common/validtext';
import { LoginBtn } from '../../../styles/common/buttons';
import SignupLink from '../SignupLink/SignupLink';
import LoginId from '../LoginId';
import LoginPw from '../LoginPw';

export const FormBox = styled.form`
  width: 100%;
  height: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
  margin-top: 40px;
`;

const FindIdPwd = styled.span`
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
`;

function EmailFormStyle ({ message, onIdChange, onPwChange, onLoginClose, onLoginSubmit}) {
  return (
    <FormBox method='POST'>
      <LoginId 
        onIdChange={onIdChange}
      />
      <LoginPw
        onPwChange={onPwChange}
      />
      {message !== undefined && <LoginValid validLogin={message}> {message} </LoginValid>}
      <LoginBtn onClick={onLoginSubmit}> 로그인 </LoginBtn>
      <SignupLink
        onLoginClose={onLoginClose}
      />
      <FindIdPwd> 혹시 아이디와 비밀번호를 잊어버리셨나요? </FindIdPwd>
    </FormBox>
  );
}

export default EmailFormStyle;