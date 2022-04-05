import React from 'react';
import { LoginInput, LoginLabel } from '../../styles/login/LoginInput';

function LoginId ({handleIdChange}) {
  return (
    <>
      <LoginLabel> 아이디 </LoginLabel>
      <LoginInput name="userId" type="text" onChange={handleIdChange} placeholder='아이디를 입력하세요.'/>
    </>
  )
}

export default LoginId;