import React from 'react';
import styled from 'styled-components';
import { ChangePwBtn, CancelBtn } from '../../../styles/common/buttons';
import { MyInfoInput } from '../../../styles/common/input';
import { ValidCheck } from '../../../styles/common/validtext';

const PasswordWrapper = styled.form`
  width: 80%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const PasswordTitle = React.memo(styled.h2`
  width: 70%;
  height: 70px;
  line-height: 70px;
  font-size: 28px;
  font-weight: bold;
`);

const PasswordBox = styled.div`
  width: 70%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: space-evenly;
  gap: 20px;
`;

function PasswordChangeStyle ({ register, errors, onCheckNewPwBlur, onPwSubmit, onSubmit, onCancelClick }) {
  return (
    <PasswordWrapper onSubmit={onSubmit(onPwSubmit)}>
      <PasswordTitle> 비밀번호 변경 </PasswordTitle>
      <PasswordBox>
        <MyInfoInput
          type="password"
          placeholder="현재 비밀번호"
          {...register("oldPassword", {
            required: "현재 비밀번호를 입력해주세요.",
            pattern: {
              value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
              message: "8~16자, 최소 하나의 숫자와 특수문자가 필요합니다."
          }})}
        />
        { errors.oldPassword && <ValidCheck> {errors.oldPassword.message} </ValidCheck>}
        <MyInfoInput
          type="password"
          placeholder='새 비밀번호'
          {...register("newPassword", {
            required: "새 비밀번호를 입력해주세요.",
            pattern: {
              value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
              message: "8~16자, 최소 하나의 숫자와 특수문자가 필요합니다."
          }})}
        />
        { errors.newPassword && <ValidCheck> {errors.newPassword.message} </ValidCheck>}
        <MyInfoInput
          type="password"
          placeholder='새 비밀번호 확인'
          {...register("newPassword2", {
            required: "새 비밀번호를 입력해주세요.",
            validate: {
              matchesNewPassword: onCheckNewPwBlur(),
            }
          })}
        />
        { errors.newPassword2 && <ValidCheck> {errors.newPassword2.message} </ValidCheck>}
      </PasswordBox>
      <ChangePwBtn> 확인 </ChangePwBtn>
      <CancelBtn onClick={onCancelClick}> 취소 </CancelBtn>
    </PasswordWrapper>
  );
}

export default PasswordChangeStyle;