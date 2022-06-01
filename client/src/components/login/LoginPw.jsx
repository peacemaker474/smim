import React from 'react';
import { LoginInput, LoginLabel } from '../../styles/login/LoginInput';

function LoginPw ({onPwChange}) {
  return (
    <>
      <LoginLabel> 비밀번호 </LoginLabel>
      <LoginInput 
        type="password"
        placeholder='비밀번호를 입력하세요.'
        onChange={onPwChange}
        autoComplete='off'
      />
    </>
  )
}

export default LoginPw;