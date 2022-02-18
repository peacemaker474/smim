import React from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import LoginHeader from './LoginHeader';
import { useDispatch } from 'react-redux';
import { loginClose } from '../../redux/toggle/action';

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;

const LoginOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(12, 12, 12, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const LoginBox = styled.section`
  width: 40%;
  height: 80%;
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 5px;
`;

function LoginSection () {
  const dispatch = useDispatch();
  const handleLoginClose = () => {
    dispatch(loginClose());
  }

  return (
    <LoginContainer>
      <LoginOverlay onClick={handleLoginClose}/>
      <LoginBox>
        <LoginHeader />
        <LoginForm />
      </LoginBox>
    </LoginContainer>
  );
}

export default LoginSection;