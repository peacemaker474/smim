import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { SignupTitle } from '../../../styles/signup/title';
import { InputBox, CheckBox } from '../../../styles/signup/container';
import { SignupInput } from '../../../styles/common/input';
import { ValidCheck } from '../../../styles/common/validtext';

function SignupIdStyle ({ register, errors, valid, onIdBlur}) {
  return (
    <InputBox>
      <SignupTitle> 아이디 </SignupTitle>
      <SignupInput
        {
          ...register("userId", {
            required: "아이디를 입력하세요",
            pattern: {
              value: /^[a-zA-Z0-9]{4,12}$/,
              message: "4~12자리의 영문, 숫자만 가능합니다."
            },
            onBlur: onIdBlur(),
          })
        }
        type="text"
      />
      { valid.userId ?
          <CheckBox /> :
          <ErrorMessage
            errors={errors}
            name="userId"
            render={({ message }) => <ValidCheck current={valid.userId}> {message} </ValidCheck>}
          /> }
    </InputBox>
  );
}

export default SignupIdStyle;