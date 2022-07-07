import React from 'react';
import { LoginInput, LoginLabel } from '../../styles/login/LoginInput';

function LoginId ({ register }) {
  return (
    <>
      <LoginLabel> 아이디 </LoginLabel>
      <LoginInput 
        {
          ...register("userId",
          {
            required: "아이디를 입력하세요",
            pattern: {
              value: /^[a-zA-Z0-9]{4,12}$/,
              message: "4~12자리의 영문, 숫자만 가능합니다."
            }
          })
        }
        type="text"
        placeholder='아이디를 입력하세요.'
      />
    </>
  )
}

export default React.memo(LoginId);