import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { SignupInput } from '../../../styles/common/input';
import { ValidCheck } from '../../../styles/common/validtext';
import { CheckBox, InputBox } from '../../../styles/signup/container';
import { SignupTitle } from '../../../styles/signup/title';

function SignupPwStyle ({register, errors, valid, onCheckPwBlur }) {
  return (
    <>
      <InputBox>
        <SignupTitle for="password"> 비밀번호 </SignupTitle>
        <SignupInput
          type="password"
          id="password"
          {...register("password", {
            required: "비밀번호를 입력하세요.",
            pattern: {
              value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
              message: "8~16자, 최소 하나의 숫자와 특수문자가 필요합니다.",
            },
          })}
        />
        { errors.password &&
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => <ValidCheck> {message} </ValidCheck>}
            />
        }
      </InputBox>
      <InputBox>
        <SignupTitle for="check"> 비밀번호 재확인 </SignupTitle>
        <SignupInput
          type="password"
          id="check"
          {...register("check", {
            required: "비밀번호를 입력하세요.",
            validate: {
              matchesPreviousPassword: onCheckPwBlur(),
            },
          })}
        />
        {
          valid.check ?
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