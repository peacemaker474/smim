import React from 'react';
import { LoginInput, LoginLabel } from '../../styles/login/LoginInput';

function LoginId ({onIdChange}) {
  return (
    <>
      <LoginLabel> 아이디 </LoginLabel>
      <LoginInput name="userId" type="text" onChange={onIdChange} placeholder='아이디를 입력하세요.'/>
    </>
  )
}

export default LoginId;