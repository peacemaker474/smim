import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { SignupInput } from '../../../styles/common/input';
import { ValidCheck } from '../../../styles/common/validtext';
import { CheckBox, InputBox } from '../../../styles/signup/container';
import { SignupTitle } from '../../../styles/signup/title';

function SignupNameStyle ({ register, errors, valid, onExistedName}) {
  return (
    <InputBox>
    <SignupTitle for="nickName"> 닉네임 </SignupTitle>
      <SignupInput
        type="text"
        id="nickName"
        {...register("nickName", {
          required: "닉네임을 입력하세요.",
          pattern: {
            value: /^[가-힣a-zA-Z0-9]{3,8}$/,
            message: "3~8 자리의 한글, 영문, 숫자만 가능합니다.",
          },
          validate: {
            checkExistedName: onExistedName(),
          }
        })}
      />
      { valid.nickName ?
          <CheckBox /> :
          <ErrorMessage
            errors={errors}
            name="nickName"
            render={({ message }) => <ValidCheck current={valid.nickName}> {message} </ValidCheck>}
          /> }
    </InputBox>
  );
}

export default SignupNameStyle;