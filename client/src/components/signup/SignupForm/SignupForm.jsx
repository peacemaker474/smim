import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postSignupSubmit } from '../../../network/signup/http';
import SignupFormStyle from './SignupForm.style';

function SignupForm() {
  const [message, setMessage] = useState({
    userId: '',
    email: '',
    nickName: '',
    password: '',
    check: '',
  });

  const [valid, setValid] = useState({
    userId: false,
    email: false,
    nickName: false,
    password: false,
    check: false,
  });

  const [inputs, setInputs] = useState({
    userId: '',
    email: '',
    nickName: '',
    birthday: '',
    password: '',
    check: '',
  });

  const handleInputChange = (evt) => {
    const name = evt.target.name;
    setInputs({ ...inputs, [name]: evt.target.value });
  };

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
      };

      postSignupSubmit(body).then((res) => {
        if (res.data.success) {
          navigate('/');
        }
      });
    }
  };

  return (
    <SignupFormStyle
      message={message}
      setMessage={setMessage}
      valid={valid}
      setValid={setValid}
      inputs={inputs}
      setInputs={setInputs}
      onInputChange={handleInputChange}
      onSignupSubmit={handleSignupSubmit}
    />
  );
}

export default SignupForm;
