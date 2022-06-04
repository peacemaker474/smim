import React from 'react';
import { SignupTitle } from '../../../styles/signup/title';
import { InputBox } from '../../../styles/signup/container';
import { SignupInput } from '../../../styles/common/input';
import { ValidCheck } from '../../../styles/common/validtext';

function SignupIdStyle ({ message, valid, onInputChange, onIdBlur}) {
  return (
    <InputBox>
      <SignupTitle> 아이디 </SignupTitle>
      <SignupInput type="text" name="userId" onBlur={onIdBlur} onChange={onInputChange} />
      {message.userId !== "" && <ValidCheck current={valid.userId}> {message.userId} </ValidCheck>}
    </InputBox>
  );
}

export default SignupIdStyle;