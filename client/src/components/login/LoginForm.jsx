import React from 'react';
import styled from 'styled-components';
import EmailForm from './EmailForm';
import SocialForm from './SocialForm';

const LoginBox = styled.div`
  width: 90%;
  height: 90%;
  margin: 0 auto;
`;

function LoginForm () {
  return (
    <LoginBox>
      <EmailForm />
      <SocialForm />
    </LoginBox>
  );
}

export default LoginForm;