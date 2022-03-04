import React from 'react';
import styled from 'styled-components';
import { ColorBtn } from '../../styles/common/buttons';
import { ValidCheck } from '../../styles/common/validtext';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkEmail, checkId, checkName, signUp } from '../../network/signup/http';
import { idValidation, emailValidation, nameValidation, pwValidation } from '../../utils/validation';

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
  color: ${({current}) => current ? "green" : "red"};
`;

function SignupForm () {
  const [message, setMessage] = useState({
    name: "",
    email: "",
    nickName: "",
    password: "",
    check: "",
  });

  const [valid, setValid] = useState({
    name: false,
    email: false,
    nickName: false,
    password: false,
    check: false,
  });

  const userId = useRef(null);
  const userEmail = useRef(null);
  const userName = useRef(null);
  const userBirthday = useRef(null);
  const userPw = useRef(null);
  const userPw2 = useRef(null);

  const navigate = useNavigate();

  const handleBlurId = (evt) => {
    if (!idValidation(evt.target.value)) {
      setMessage({...message, name: '4~12자리의 영문, 숫자만 가능합니다.'});
      setValid({ ...valid, name: false});
    } else {
      checkId(evt.target.value)
        .then(({data}) => {
          setMessage({ ...message, name: data.message});
          setValid({ ...valid, name: data.success });
        });
    }
  }

  const handleBlurEmail = (evt) => {
    if (!emailValidation(evt.target.value)) {
      setMessage({ ...message, email: '이메일 형식의 맞춰서 작성해주세요.'});
      setValid({ ...valid, email: false});
    } else {
      checkEmail(evt.target.value)
        .then(({data}) => {
          setMessage({ ...message, email: data.message});
          setValid({ ...valid, email: data.success});
        });
    }
  }

  const handleBlurName = (evt) => {
    if (!nameValidation(evt.target.value)) {
      setMessage({ ...message, nickName: "3~8 자리의 한글, 영문, 숫자만 가능합니다. "});
      setValid({ ...valid, nickName: false});
    } else {
      checkName(evt.target.value)
        .then(({data}) => {
          setMessage({...message, nickName: data.message});
          setValid({...valid, nickName: data.success});
        })
    }
  }

  const handleBlurPw = (evt) => {
    if (!pwValidation(evt.target.value)) {
      setMessage({ ...message, password: "8~16자, 최소 하나의 숫자와 특수문자가 필요합니다."});
      setValid({ ...valid, password: false});
    } else {
      setValid({ ...valid, password: true});
    }
  }

  const handleBlurCheck = (evt) => {
    if (userPw.current.value !== evt.target.value) {
      setMessage({ ...message, check: "비밀번호가 서로 다릅니다."});
      setValid({ ...valid, check: false});
    } else {
      setValid({ ...valid, check: true});
    }
  }

  const handleSignupClick = (evt) => {
    evt.preventDefault();

    let result = [];
    
    for (let key in valid) {
      if (valid[key] === false) {
        result.push(key);
      }
    }

    if (result.length === 0) {
      let body = {
        name: userId.current.value,
        email: userEmail.current.value,
        nickname: userName.current.value,
        birthday: userBirthday.current.value,
        password: userPw.current.value,
        password2: userPw2.current.value,
      };

      signUp(body).then((res) => {
        if(res.data.success) {
          navigate('/');
        }
      });
    }
  };

  return (
    <SignupFormBox method='POST'>
      <Input type="text" onBlur={handleBlurId} placeholder='아이디' ref={userId} />
      {message.name !== "" && <SignupValid current={valid.name}> {message.name} </SignupValid>}
      <Input type="email" onBlur={handleBlurEmail} placeholder='이메일' ref={userEmail} />
      {message.email !== "" && <SignupValid current={valid.email}> {message.email} </SignupValid> }
      <Input type="text" onBlur={handleBlurName} placeholder='닉네임' ref={userName} />
      {message.nickName !== "" && <SignupValid current={valid.nickName}> {message.nickName} </SignupValid>}
      <Input type="text" placeholder='생년월일' ref={userBirthday} required/>
      <Input type="password" onBlur={handleBlurPw} placeholder="비밀번호" ref={userPw} />
      {message.password !== "" && <SignupValid> {message.password} </SignupValid>}
      <Input type="password" onBlur={handleBlurCheck} placeholder='비밀번호 확인' ref={userPw2} />
      {message.check !== "" && <SignupValid> {message.check} </SignupValid>}
      <BtnBox>
        <CancelBtn>취소</CancelBtn>
        <SignupBtn onClick={handleSignupClick}>회원가입</SignupBtn>
      </BtnBox>
    </SignupFormBox>
  );
}

export default SignupForm;