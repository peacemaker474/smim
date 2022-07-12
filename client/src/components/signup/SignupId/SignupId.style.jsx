import React from 'react';
import { SignupTitle } from '../../../styles/signup/title';
import { ErrorMessage } from '@hookform/error-message';
import { CheckBox, InputBox } from '../../../styles/signup/container';
import { SignupInput } from '../../../styles/common/input';
import { ValidCheck } from '../../../styles/common/validtext';

function SignupIdStyle ({ register, errors, valid, onExistedId}) {
  return (
    <InputBox>
      <SignupTitle for="userId"> 아이디 </SignupTitle>
      <SignupInput
        type="text"
        id="userId"
        {...register("userId", {
          required: "아이디를 입력하세요",
          pattern: {
            value: /^[a-zA-Z0-9]{4,12}$/,
            message: "4~12자리의 영문, 숫자만 가능합니다."
          },
          validate: {
            checkExistsId: onExistedId(),
          }
        })}
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