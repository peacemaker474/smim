import React from 'react';
import LoginHeaderStyle from './LoginHeader.style';

function LoginHeader ({onLoginClose}) {
  return (
    <LoginHeaderStyle
      onLoginClose={onLoginClose}
    />
  );
}

export default LoginHeader;