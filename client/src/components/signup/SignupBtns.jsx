import React from 'react';
import styled from 'styled-components';
import { ColorBtn } from '../../styles/common/buttons';

const BtnBox = styled.div`
  width: 40%;
  height: 10%;
  display: flex;
  justify-content: space-between;
`;

const SignupBtn = styled(ColorBtn)`
  background-color: ${({theme}) => theme.color.yellow};
  border: none;
  width: 80px;
  height: 70%;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
`;

const CancelBtn = styled(ColorBtn)`
  width: 80px;
  height: 70%;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
`;

function SignupBtns ({ onSignupSubmit }) {
  return (
    <BtnBox>
      <CancelBtn> 취소 </CancelBtn>
      <SignupBtn onClick={onSignupSubmit}> 회원가입 </SignupBtn>
    </BtnBox>
  )
}

export default SignupBtns;