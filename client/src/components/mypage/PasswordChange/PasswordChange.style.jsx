import React from 'react';
import styled from 'styled-components';
import { ChangePwBtn, CancelBtn } from '../../../styles/common/buttons';
import { ChangePwInput } from '../../../styles/common/input';
import { MyPageValid } from '../../../styles/common/validtext';

const PasswordWrapper = styled.form`
  width: 70%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  @media screen and (max-width: 1180px) {
    width: 90%;
    height: 80%;
  }

  @media screen and (max-width: 769px) {
    height: 50%;
  }

  @media screen and (max-width: 375px) {
    width: 100%;
  }

  @media screen and (max-height: 796px) {
    height: 80%;
  }
`;

const PasswordTitle = React.memo(styled.h2`
  width: 70%;
  height: 30px;
  line-height: 30px;
  font-size: 1.5em;
  font-weight: bold;
`);

const PasswordBox = styled.div`
  width: 70%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const InputWrapper = styled.div`
  height: 25%;
  display: flex;
  flex-direction: column;
`;

function PasswordChangeStyle ({ register, errors, onCheckNewPwBlur, onPwSubmit, onSubmit, onCancelClick }) {
  return (
    <PasswordWrapper onSubmit={onSubmit(onPwSubmit)}>
      <PasswordTitle> 비밀번호 변경 </PasswordTitle>
      <PasswordBox>
        <InputWrapper>
          <ChangePwInput
            type="password"
            placeholder="현재 비밀번호"
            {...register("oldPassword", {
              required: "현재 비밀번호를 입력해주세요.",
              pattern: {
                value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
                message: "8~16자, 최소 하나의 숫자와 특수문자가 필요합니다."
            }})}
          />
          { errors.oldPassword && <MyPageValid> {errors.oldPassword.message} </MyPageValid>}
        </InputWrapper>
        <InputWrapper>
          <ChangePwInput
            type="password"
            placeholder='새 비밀번호'
            {...register("newPassword", {
              required: "새 비밀번호를 입력해주세요.",
              pattern: {
                value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
                message: "8~16자, 최소 하나의 숫자와 특수문자가 필요합니다."
            }})}
          />
          { errors.newPassword && <MyPageValid> {errors.newPassword.message} </MyPageValid>}
        </InputWrapper>
        <InputWrapper>
          <ChangePwInput
            type="password"
            placeholder='새 비밀번호 확인'
            {...register("newPassword2", {
              required: "새 비밀번호를 입력해주세요.",
              validate: {
                matchesNewPassword: onCheckNewPwBlur(),
              }
            })}
          />
          { errors.newPassword2 && <MyPageValid> {errors.newPassword2.message} </MyPageValid>}
        </InputWrapper>
      </PasswordBox>
      <ChangePwBtn> 확인 </ChangePwBtn>
      <CancelBtn onClick={onCancelClick}> 취소 </CancelBtn>
    </PasswordWrapper>
  );
}

export default PasswordChangeStyle;