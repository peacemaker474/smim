import React from 'react';
import { pwValidation } from '../../../utils/validation';
import SignupPwStyle from './SignupPw.style';

function SignupPw ({message, setMessage, valid, setValid, inputs, onInputChange}) {
  const handlePwBlur = (evt) => {
    if (!pwValidation(evt.target.value)) {
      setMessage({ ...message, password: "8~16자, 최소 하나의 숫자와 특수문자가 필요합니다."});
      setValid({ ...valid, password: false});
    } else {
      setValid({ ...valid, password: true});
    }
  }

  const handleCheckBlur = (evt) => {
    if (inputs.password !== evt.target.value) {
      setMessage({ ...message, check: "비밀번호가 서로 다릅니다."});
      setValid({ ...valid, check: false});
    } else {
      setValid({ ...valid, check: true});
    }
  }
  return (
    <SignupPwStyle
      message={message}
      onInputChange={onInputChange}
      onPwBlur={handlePwBlur}
      onCheckBlur={handleCheckBlur}
    />
  )
}

export default SignupPw;