import React from 'react';
import styled from 'styled-components';
import SignupId from '../SignupId/SignupId';
import SignupEmail from '../SignupEmail/SignupEmail';
import SignupName from '../SignupName/SignupName';
import SignupBirth from '../SignupBirth/SignupBirth';
import SignupPw from '../SignupPassword/SignupPw';
import SignupBtns from '../SignupButton/SignupBtns';

const SignupFormBox = styled.form`
  width: 60%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

function SignupFormStyle ({message, setMessage, valid, setValid, inputs, setInputs, onInputChange, onSignupSubmit}) {
  return (
    <SignupFormBox method='POST'>
      <SignupId 
        message={message}
        setMessage={setMessage}
        valid={valid}
        setValid={setValid}
        onInputChange={onInputChange}
      />
      <SignupEmail 
        message={message}
        setMessage={setMessage}
        valid={valid}
        setValid={setValid}
        onInputChange={onInputChange}
      />
      <SignupName 
        message={message}
        setMessage={setMessage}
        valid={valid}
        setValid={setValid}
        onInputChange={onInputChange}
      />
      <SignupBirth
        inputs={inputs}
        setInputs={setInputs}
      />
      <SignupPw 
        message={message}
        setMessage={setMessage}
        valid={valid}
        setValid={setValid}
        inputs={inputs}
        onInputChange={onInputChange}
      />
      <SignupBtns onSignupSubmit={onSignupSubmit} />
    </SignupFormBox>
  )
}

export default SignupFormStyle;