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

function LoginId ({ register, errors }) {
  return (
    <InputWrapper>
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
      {errors?.userId && <LoginValid> {errors.userId?.message} </LoginValid>}
    </InputWrapper>
  )
}

export default LoginId;