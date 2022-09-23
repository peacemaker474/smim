import React from 'react';
import { SignupInput } from '../../../styles/common/input';
import { ValidCheck } from '../../../styles/common/validtext';
import { CheckBox, InputBox } from '../../../styles/signup/container';
import { ErrorMessage } from '@hookform/error-message';
import { SignupTitle } from '../../../styles/signup/title';

function SignupEmailStyle ({ register, errors, valid, onCheckExistedEmail}) {
  return (
    <InputBox>
      <SignupTitle for="email"> 이메일 </SignupTitle>
      <SignupInput
        type="email"
        id="email"
        {...register("email", {
          required: "이메일을 입력하세요",
          pattern: {
            value: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
            message: "이메일 형식의 맞춰서 작성해주세요."
          },
          validate: {
            checkExistsEmail: onCheckExistedEmail(),
          }
        })}
      />
      { valid.email ?
        <CheckBox /> :
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => <ValidCheck> { message } </ValidCheck>}
        /> }
    </InputBox>
  );
}

export default SignupEmailStyle;