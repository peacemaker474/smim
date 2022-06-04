import React from 'react';
import { SignupInput } from '../../../styles/common/input';
import { ValidCheck } from '../../../styles/common/validtext';
import { InputBox } from '../../../styles/signup/container';
import { SignupTitle } from '../../../styles/signup/title';

function SignupEmailStyle ({ message, valid, onInputChange, onEmailBlur}) {
  return (
    <InputBox>
      <SignupTitle> 이메일 </SignupTitle>
      <SignupInput type="email" name="email" onChange={onInputChange} onBlur={onEmailBlur} />
      {message.email !== "" && <ValidCheck current={valid.email}> {message.email} </ValidCheck> }
    </InputBox>
  );
}

export default SignupEmailStyle;