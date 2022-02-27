import React from 'react';
import styled from 'styled-components';
import {ColorBtn} from '../../styles/common/buttons';
import {ValidCheck} from '../../styles/common/validtext';
import { useState, useRef } from 'react';
import { checkId, signUp } from '../../network/signup/http';

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

const ValidId = styled(SignupValid)`
  color: ${({current}) => current ? "green" : "red"};
`;

function SignupForm () {
  const [message, setMessage] = useState({
    name: "",
    email: "",
    nickName: "",
    password: "",
  });
  const [valid, setValid] = useState({
    name: 0,
    email: 0,
    nickName: 0,
    password: 0,
  });

  const userId = useRef(null);
  const userEmail = useRef(null);
  const userName = useRef(null);
  const userBirthday = useRef(null);
  const userPw = useRef(null);
  const userPw2 = useRef(null);

  const handleBlurId = (evt) => {
    checkId(evt.target.value)
      .then(({data: {success, message}}) => {
        setMessage({...message, name: message});
        setValid({...valid, name: evt.target.value === "" ? 0 : success });
      });
  }

  const handleSignupClick = (evt) => {
    evt.preventDefault();

    let body = {
      name: userId.current.value,
      email: userEmail.current.value,
      nickname: userName.current.value,
      birthday: userBirthday.current.value,
      password: userPw.current.value,
      password2: userPw2.current.value,
    }
    signUp(body).then((res) => console.log(res.data));
  };

  return (
    <SignupFormBox method='POST'>
      <Input type="text" onBlur={handleBlurId} placeholder='아이디' ref={userId} />
      {valid.name !== 0 && <ValidId current={valid.name}> {message.name} </ValidId>}
      <Input type="email" placeholder='이메일' ref={userEmail} />
      <SignupValid> 이미 사용중이거나 탈퇴한 이메일입니다. </SignupValid>
      <Input type="text" placeholder='닉네임' ref={userName} />
      <SignupValid> 이미 사용중인 닉네임입니다. </SignupValid>
      <Input type="text" placeholder='생년월일' ref={userBirthday} required/>
      <Input type="password" placeholder="비밀번호" ref={userPw} />
      <SignupValid> 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요. </SignupValid>
      <Input type="password" placeholder='비밀번호 확인' ref={userPw2} />
      <SignupValid> 비밀번호가 일치하지 않습니다. </SignupValid>
      <BtnBox>
        <CancelBtn>취소</CancelBtn>
        <SignupBtn onClick={handleSignupClick}>회원가입</SignupBtn>
      </BtnBox>
    </SignupFormBox>
  );
}

export default SignupForm;