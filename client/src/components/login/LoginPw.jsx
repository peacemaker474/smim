import React from 'react';
import styled from 'styled-components';
import { LoginValid } from '../../styles/common/validtext';
import { LoginInput, LoginLabel } from '../../styles/login/LoginInput';

const InputWrapper = styled.div`
  width: 95%;
  height: 30%;
  display: flex;
  flex-direction: column;
`;

function LoginPw ({ register, errors, message }) {
  return (
    <InputWrapper>
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
      {errors?.password && <LoginValid> {errors.password?.message} </LoginValid>}
      {Object.keys(errors).length === 0 && message && <LoginValid> {message} </LoginValid>}
    </InputWrapper>
  )
}

export default LoginPw;