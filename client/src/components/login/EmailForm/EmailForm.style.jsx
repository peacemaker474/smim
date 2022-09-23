import React from 'react';
import styled from 'styled-components';
import SignupLink from '../SignupLink/SignupLink';
import LoginId from '../LoginId';
import LoginPw from '../LoginPw';

export const FormBox = styled.form`
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding-top: 1.2em;
  margin: 0 auto;
  gap: 5px;
`;

const FindIdPwd = React.memo(styled.span`
  font-size: 0.7rem;
  font-weight: bold;
  align-self: flex-end;
  cursor: pointer;
  padding-right: 1.3em;

  @media ${({ theme }) => theme.device.mobile } {
    font-size: 0.5rem;
  }
`);

const LoginBtn = React.memo(styled.button`
  width: 95%;
  height: 10%;
  background-color: #ffc306;
  color: #EFFFE9;
  font-weight: bold;
  margin: 15px 0;
  font-size: 1rem;

  @media ${({ theme }) => theme.device.mobile } {
    margin: 10px 0;
    font-size: 0.8rem;
  }
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