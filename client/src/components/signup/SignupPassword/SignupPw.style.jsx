import React from 'react';
import { SignupInput } from '../../../styles/common/input';
import { ValidCheck } from '../../../styles/common/validtext';
import { InputBox } from '../../../styles/signup/container';
import { SignupTitle } from '../../../styles/signup/title';

function SignupPwStyle ({ message, onInputChange, onPwBlur, onCheckBlur}) {
  return (
    <>
      <InputBox>
        <SignupTitle> 비밀번호 </SignupTitle>
        <SignupInput type="password" name="password" onChange={onInputChange} onBlur={onPwBlur} />
        {message.password !== "" && <ValidCheck> {message.password} </ValidCheck>}
      </InputBox>
      <InputBox>
        <SignupTitle> 비밀번호 재확인 </SignupTitle>
        <SignupInput type="password" name="check" onChange={onInputChange} onBlur={onCheckBlur} />
        {message.check !== "" && <ValidCheck> {message.check} </ValidCheck>}
      </InputBox>
    </>
  );
}

export default SignupPwStyle;