import React from 'react';
import styled from 'styled-components';
import {ColorBtn} from '../../styles/common/buttons';
import {ValidCheck} from '../../styles/common/validtext';

const SignupFormBox = styled.form`
  width: 60%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Input = styled.input`
  all: unset;
  width: 100%;
  height: 8%;
  border: 4px solid ${({theme}) => theme.color.yellow};
  padding-left: 10px;
  box-sizing: border-box;
  border-radius: 5px;
`;

const BtnBox = styled.div`
  width: 40%;
  height: 10%;
  display: flex;
  justify-content: space-between;
`;

const CancelBtn = styled(ColorBtn)`
  width: 80px;
  height: 70%;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
`;

const SignupBtn = styled(ColorBtn)`
  background-color: ${({theme}) => theme.color.yellow};
  border: none;
  width: 80px;
  height: 70%;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
`;

const SignupValid = styled(ValidCheck)`
  align-self: flex-end;
  margin-top: -10px;
  font-size: 11px;
`;

function SignupForm () {
  return (
    <SignupFormBox>
      <Input type="text" placeholder='아이디' />
      <SignupValid> 이미 사용중이거나 탈퇴한 아이디입니다. </SignupValid>
      <Input type="email" placeholder='이메일' />
      <SignupValid> 이미 사용중이거나 탈퇴한 이메일입니다. </SignupValid>
      <Input type="text" placeholder='닉네임' />
      <SignupValid> 이미 사용중인 닉네임입니다. </SignupValid>
      <Input type="text" placeholder='생년월일'/>
      <Input type="password" placeholder="비밀번호" />
      <SignupValid> 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요. </SignupValid>
      <Input type="password" placeholder='비밀번호 확인' />
      <SignupValid> 비밀번호가 일치하지 않습니다. </SignupValid>
      <BtnBox>
        <CancelBtn>취소</CancelBtn>
        <SignupBtn>회원가입</SignupBtn>
      </BtnBox>
    </SignupFormBox>
  );
}

export default SignupForm;