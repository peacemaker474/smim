import React from 'react';
import SignupLinkStyle from './SignupLink.style';

function SignupLink ({ onLoginClose }) {
  return (
    <SignupLinkStyle 
      onLoginClose={onLoginClose}
    />
  )
}

export default React.memo(SignupLink);