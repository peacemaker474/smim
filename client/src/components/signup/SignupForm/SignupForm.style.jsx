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
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

function SignupFormStyle ({register, errors, getValues, onSubmit, valid, setValid, onSignupSubmit, onCancelClick}) {
  return (
    <SignupFormBox method='POST' onSubmit={onSubmit(onSignupSubmit)}>
      <SignupId
        register={register}
        errors={errors}
        valid={valid}
        setValid={setValid}
      />
      <SignupEmail
        register={register}
        errors={errors}
        valid={valid}
        setValid={setValid}
      />
      <SignupName
        register={register}
        errors={errors}
        valid={valid}
        setValid={setValid}
      />
      <SignupBirth
        register={register}
        errors={errors}
        getValues={getValues}
      />
      <SignupPw
        register={register}
        errors={errors}
        getValues={getValues}
        valid={valid}
        setValid={setValid}
      />
      <SignupBtns
        onCancelClick={onCancelClick}
      />
    </SignupFormBox>
  )
}

export default SignupFormStyle;