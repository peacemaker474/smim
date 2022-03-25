import React from 'react';
import { SignupInput } from '../../styles/common/input';
import { ValidCheck } from '../../styles/common/validtext';
import { InputBox } from '../../styles/signup/container';
import { SignupTitle } from '../../styles/signup/title';
import { pwValidation } from '../../utils/validation';

function SignupPw ({message, setMessage, valid, setValid, inputs, handleInputChange}) {
  const handleBlurPw = (evt) => {
    if (!pwValidation(evt.target.value)) {
      setMessage({ ...message, password: "8~16자, 최소 하나의 숫자와 특수문자가 필요합니다."});
      setValid({ ...valid, password: false});
    } else {
      setValid({ ...valid, password: true});
    }
  }

  const handleBlurCheck = (evt) => {
    if (inputs.password !== evt.target.value) {
      setMessage({ ...message, check: "비밀번호가 서로 다릅니다."});
      setValid({ ...valid, check: false});
    } else {
      setValid({ ...valid, check: true});
    }
  }
  return (
    <>
    <InputBox>
      <SignupTitle> 비밀번호 </SignupTitle>
      <SignupInput type="password" name="password" onChange={handleInputChange} onBlur={handleBlurPw} />
      {message.password !== "" && <ValidCheck> {message.password} </ValidCheck>}
    </InputBox>
    <InputBox>
      <SignupTitle> 비밀번호 재확인 </SignupTitle>
      <SignupInput type="password" name="check" onChange={handleInputChange} onBlur={handleBlurCheck} />
      {message.check !== "" && <ValidCheck> {message.check} </ValidCheck>}
    </InputBox>
    </>
  )
}

export default SignupPw;