import React from 'react';
import { pwValidation } from '../../../utils/validation';
import SignupPwStyle from './SignupPw.style';

function SignupPw ({register, errors, setError, getValues, message, setMessage, valid, setValid, inputs, onInputChange}) {
  const handlePwBlur = () => (evt) => {
    if (!pwValidation(evt.target.value)) {
      setError("password", {
        type: "Enter password",
        message: "비밀번호를 입력하세요."
      })
      setValid({ ...valid, password: false});
    } else {
      setValid({ ...valid, password: true});
    }
  }

  const handleCheckBlur = () => (evt) => {
    console.log(getValues("password"));
    if (getValues("password") !== evt.target.value) {
      setError("check", {
        type: "diffrent password",
        message: "비밀번호가 서로 다릅니다."
      })
      setValid({ ...valid, check: false});
    } else {
      setValid({ ...valid, check: true});
    }
  }
  return (
    <SignupPwStyle
      register={register}
      errors={errors}
      setError={setError}
      message={message}
      valid={valid}
      onInputChange={onInputChange}
      onPwBlur={handlePwBlur}
      onCheckBlur={handleCheckBlur}
    />
  )
}

export default SignupPw;