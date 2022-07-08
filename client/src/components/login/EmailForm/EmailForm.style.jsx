import React from 'react';
import styled from 'styled-components';
import { LoginValid } from '../../../styles/common/validtext';
import SignupLink from '../SignupLink/SignupLink';
import LoginId from '../LoginId';
import LoginPw from '../LoginPw';
import { LoginBtn } from '../../../styles/common/buttons';

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

const FindIdPwd = React.memo(styled.span`
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
`);


function EmailFormStyle ({ message, register, errors, onSubmit, onLoginClose, onLoginSubmit }) {
  return (
    <FormBox method='POST' onSubmit={onSubmit(onLoginSubmit)}>
      <LoginId register={register} />
      {errors.userId?.message && <LoginValid validLogin={errors.userId.message}> {errors.userId.message} </LoginValid>}
      <LoginPw register={register} />
      {errors.password?.message && <LoginValid validLogin={errors.password.message}> {errors.password.message} </LoginValid>}
      {Object.keys(errors).length === 0 && message && <LoginValid validLogin={message}> {message} </LoginValid>}
      <LoginBtn> 로그인 </LoginBtn>
      <SignupLink
        onLoginClose={onLoginClose}
      />
      <FindIdPwd> 혹시 아이디와 비밀번호를 잊어버리셨나요? </FindIdPwd>
    </FormBox>
  );
}

export default EmailFormStyle;