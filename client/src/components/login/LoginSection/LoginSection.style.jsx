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
  z-index: 2;
`;

const LoginOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(12, 12, 12, 0.2);
  position: absolute;
  top: 0;
  left: 0;
`;

const LoginWrapper = styled.section`
  width: 25%;
  height: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 5px;
`;

const LoginBox = styled.div`
  width: 90%;
  height: 90%;
  margin: 0 auto;
`;


function LoginSectionStyle ({ onLoginClose }) {
  return (
    <LoginContainer>
      <LoginOverlay onClick={onLoginClose} />
      <LoginWrapper>
        <LoginHeader onLoginClose={onLoginClose}/>
        <LoginBox>
          <EmailForm />
        </LoginBox>
      </LoginWrapper>
    </LoginContainer>
  );
}

export default React.memo(LoginSectionStyle);