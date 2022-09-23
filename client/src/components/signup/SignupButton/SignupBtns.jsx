import React from 'react';
import SignupBtnsStyle from './SignupBtns.style';

function SignupBtns ({ onCancelClick }) {
  return (
    <SignupBtnsStyle 
      onCancelClick={onCancelClick}
    />
  );
}

export default React.memo(SignupBtns);