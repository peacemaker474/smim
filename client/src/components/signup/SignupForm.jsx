import React, { useState } from 'react';
import styled from 'styled-components';
import SignupId from './SignupId';
import SignupEmail from './SignupEmail';
import SignupName from './SignupName';
import SignupBirth from './SignupBirth';
import SignupPw from './SignupPw';
import SignupBtns from './SignupBtns';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../network/signup/http';

const SignupFormBox = styled.form`
  width: 60%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

function SignupForm () {
  const [message, setMessage] = useState({
    userId: "",
    email: "",
    nickName: "",
    password: "",
    check: "",
  });

  const [valid, setValid] = useState({
    userId: false,
    email: false,
    nickName: false,
    password: false,
    check: false,
  });

  const [inputs, setInputs] = useState({
    userId: "",
    email: "",
    nickName: "",
    birthday: "",
    password: "",
    check: "",
  });

  const handleInputChange = (evt) => {
    const name = evt.target.name;
    setInputs({ ...inputs, [name]: evt.target.value});
  }

  const navigate = useNavigate();

  const handleSignupSubmit = (evt) => {
    evt.preventDefault();

    let result = [];
    
    for (let key in valid) {
      if (valid[key] === false) {
        result.push(key);
      }
    }

    if (result.length === 0) {
      let body = {
        userId: inputs.userId,
        email: inputs.email,
        nickname: inputs.nickName,
        birthday: inputs.birthday,
        password: inputs.password,
        password2: inputs.check,
      };
      
      console.log(body);

      signUp(body).then((res) => {
        if(res.data.success) {
          navigate('/');
        }
      });
    }
  };

  return (
    <SignupFormBox method='POST'>
      <SignupId 
        message={message}
        setMessage={setMessage}
        valid={valid}
        setValid={setValid}
        onInputChange={handleInputChange}
      />
      <SignupEmail 
        message={message}
        setMessage={setMessage}
        valid={valid}
        setValid={setValid}
        onInputChange={handleInputChange}
      />
      <SignupName 
        message={message}
        setMessage={setMessage}
        valid={valid}
        setValid={setValid}
        onInputChange={handleInputChange}
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
        onInputChange={handleInputChange}
      />
      <SignupBtns onSignupSubmit={handleSignupSubmit} />
    </SignupFormBox>
  );
}

export default SignupForm;