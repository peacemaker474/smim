import React from 'react';
import { checkEmail } from '../../network/signup/http';
import { SignupInput } from '../../styles/common/input';
import { ValidCheck } from '../../styles/common/validtext';
import { InputBox } from '../../styles/signup/container';
import { SignupTitle } from '../../styles/signup/title';
import { emailValidation } from '../../utils/validation';

function SignupEmail ({message, setMessage, valid, setValid, handleInputChange}) {
  const handleBlurEmail = (evt) => {
    if (!emailValidation(evt.target.value)) {
      setMessage({ ...message, email: '이메일 형식의 맞춰서 작성해주세요.'});
      setValid({ ...valid, email: false});
    } else {
      checkEmail(evt.target.value)
        .then(({data}) => {
          setMessage({ ...message, email: data.message});
          setValid({ ...valid, email: data.success});
        });
    }
  }
  return (
    <InputBox>
      <SignupTitle> 이메일 </SignupTitle>
      <SignupInput type="email" name="email" onChange={handleInputChange} onBlur={handleBlurEmail} />
      {message.email !== "" && <ValidCheck current={valid.email}> {message.email} </ValidCheck> }
    </InputBox>
  )
}

export default SignupEmail;