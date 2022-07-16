import React from 'react';
import styled from 'styled-components';
import SignupLink from '../SignupLink/SignupLink';
import LoginId from '../LoginId';
import LoginPw from '../LoginPw';
import { LoginBtn } from '../../../styles/common/buttons';

export const FormBox = styled.form`
  width: 100%;
  height: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  margin-top: 1.2em;
`;

const FindIdPwd = React.memo(styled.span`
  font-size: 0.7em;
  font-weight: bold;
  align-self: flex-end;
  cursor: pointer;
  padding-right: 1.1em;
`);


function EmailFormStyle ({ message, register, errors, onSubmit, onLoginClose, onLoginSubmit }) {
  return (
    <FormBox method='POST' onSubmit={onSubmit(onLoginSubmit)}>
      <LoginId register={register} errors={errors} />
      <LoginPw register={register} errors={errors} message={message} />
      <FindIdPwd> 혹시 아이디와 비밀번호를 잊어버리셨나요? </FindIdPwd>
      <LoginBtn> 로그인 </LoginBtn>
      <SignupLink
        onLoginClose={onLoginClose}
      />
    </FormBox>
  );
}

export default EmailFormStyle;