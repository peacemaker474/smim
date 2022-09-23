import React from 'react';
import styled from 'styled-components';
import EmailForm from '../EmailForm/EmailForm';
import LoginHeader from '../LoginHeader/LoginHeader';

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(12, 12, 12, 0.2);
`;

const LoginOverlay = styled.div`
  width: 100%;
  height: 100%;
`;

const LoginWrapper = styled.section`
  width: 23rem;
  height: 24rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 5px;

  @media ${({ theme }) => theme.device.mobile } {
    width: 16.5rem;
    height: 19rem;
  }
`;


function LoginSectionStyle ({ onLoginClose }) {
  return (
    <LoginContainer>
      <LoginOverlay onClick={onLoginClose} />
      <LoginWrapper>
        <LoginHeader onLoginClose={onLoginClose}/>
        <EmailForm />
      </LoginWrapper>
    </LoginContainer>
  );
}

export default React.memo(LoginSectionStyle);