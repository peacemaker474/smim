import React from 'react';
import { SignupInput } from '../../../styles/common/input';
import { ValidCheck } from '../../../styles/common/validtext';
import { InputBox } from '../../../styles/signup/container';
import { SignupTitle } from '../../../styles/signup/title';

function SignupNameStyle ({ message, valid, onInputChange, onNameBlur}) {
  return (
    <InputBox>
    <SignupTitle> 닉네임 </SignupTitle>
      <SignupInput type="text" name="nickName" onChange={onInputChange} onBlur={onNameBlur} />
      {message.nickName !== "" && <ValidCheck current={valid.nickName}> {message.nickName} </ValidCheck>}
    </InputBox>
  );
}

export default SignupNameStyle;