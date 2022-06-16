import React from 'react';
import { getCheckEmail } from '../../../network/signup/http';
import { emailValidation } from '../../../utils/validation';
import SignupEmailStyle from './SignupEmail.style';

function SignupEmail ({message, setMessage, valid, setValid, onInputChange}) {
  const handleEmailBlur = (evt) => {
    if (!emailValidation(evt.target.value)) {
      setMessage({ ...message, email: '이메일 형식의 맞춰서 작성해주세요.'});
      setValid({ ...valid, email: false});
    } else {
      getCheckEmail(evt.target.value)
        .then(({data}) => {
          setMessage({ ...message, email: data.message});
          setValid({ ...valid, email: data.success});
        })
        .catch(({ response : { data }}) => {
          setMessage({ ...message, email: data.message});
          setValid({ ...valid, email: data.success});
        })
    }
  }
  return (
    <SignupEmailStyle 
      message={message}
      valid={valid}
      onInputChange={onInputChange}
      onEmailBlur={handleEmailBlur}
    />
  )
}

export default SignupEmail;