import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { SignupInput } from '../../../styles/common/input';
import { ValidCheck } from '../../../styles/common/validtext';
import { CheckBox, InputBox } from '../../../styles/signup/container';
import { SignupTitle } from '../../../styles/signup/title';

function SignupPwStyle ({register, errors, valid, onPwBlur, onCheckBlur}) {
  return (
    <>
      <InputBox>
        <SignupTitle> 비밀번호 </SignupTitle>
        <SignupInput
          {
            ...register("password", {
              required: "비밀번호를 입력하세요.",
              pattern: {
                value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
                message: "8~16자, 최소 하나의 숫자와 특수문자가 필요합니다.",
              },
              onBlur: onPwBlur(),
            })
          }
          type="password"
        />
        {
          valid.password ?
            <CheckBox /> :
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => <ValidCheck> {message} </ValidCheck>}
            />
        }
      </InputBox>
      <InputBox>
        <SignupTitle> 비밀번호 재확인 </SignupTitle>
        <SignupInput
          {
            ...register("check", {
              required: "비밀번호를 입력하세요.",
              onBlur: onCheckBlur(),
            })
          }
          type="password"
        />
        {
          valid.check && !errors.check?.message ?
            <CheckBox /> :
            <ErrorMessage
              errors={errors}
              name="check"
              render={({ message }) => <ValidCheck> {message} </ValidCheck>}
            />
        }
      </InputBox>
    </>
  );
}

export default SignupPwStyle;