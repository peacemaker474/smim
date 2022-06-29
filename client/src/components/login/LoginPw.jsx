import React from 'react';
import { LoginInput, LoginLabel } from '../../styles/login/LoginInput';

function LoginPw ({ register }) {
  return (
    <>
      <LoginLabel> 비밀번호 </LoginLabel>
      <LoginInput 
        {
          ...register("password", {
            required: "비밀번호를 입력하세요.",
            pattern: {
              value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
              message: "8~16자, 최소 하나의 숫자와 특수문자가 필요합니다."
            }
          })
        }
        type="password"
        placeholder='비밀번호를 입력하세요.'
        autoComplete='off'
      />
    </>
  )
}

export default LoginPw;