import React from 'react';
import SignupBtnsStyle from './SignupBtns.style';

function SignupBtns ({ onSignupSubmit }) {
  return (
    <SignupBtnsStyle 
      onSignupSubmit={onSignupSubmit}
    />
  );
}

export default SignupBtns;