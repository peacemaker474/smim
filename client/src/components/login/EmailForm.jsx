import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LoginValid } from '../../styles/common/validtext';
import { LoginBtn } from '../../styles/common/buttons';
import { useDispatch, useSelector } from 'react-redux';
import { loginClose } from '../../redux/toggle/action';
import { loginUser } from '../../redux/login/action';
import LoginId from './LoginId';
import LoginPw from './LoginPw';
import SignupLink from './SignupLink';

export const FormBox = styled.form`
  width: 100%;
  height: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
  margin-top: 40px;
`;

const FindIdPwd = styled.span`
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
`;

function EmailForm () {
  const state = useSelector((state) => state.loginReducer);
  const {isLogin, message} = state;
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]);

  const handleIdChange = (evt) => {
    setUserId(evt.target.value);
  }

  const handlePwChange = (evt) => {
    setUserPw(evt.target.value);
  }

  const handleLoginClose = () => {
    dispatch(loginClose());
  }

  const handleLogin = (evt) => {
    evt.preventDefault();

    let body = {
      userId,
      password: userPw,
    }
    dispatch(loginUser(body));
  }

  console.log(message);
  return (
    <FormBox method='POST'>
      <LoginId 
        handleIdChange={handleIdChange}
      />
      <LoginPw
        handlePwChange={handlePwChange}
      />
      {message !== undefined && <LoginValid validLogin={message}> {message} </LoginValid>}
      <LoginBtn onClick={handleLogin}> 로그인 </LoginBtn>
      <SignupLink
        handleLoginClose={handleLoginClose}
      />
      <FindIdPwd> 혹시 아이디와 비밀번호를 잊어버리셨나요? </FindIdPwd>
    </FormBox>
  );
}

export default EmailForm;