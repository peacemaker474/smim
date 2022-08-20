import React from 'react';
import styled from 'styled-components';
import { ColorBtn } from '../../../styles/common/buttons';

const BtnBox = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
`;

const SignupBtn = styled(ColorBtn)`
  background-color: ${({theme}) => theme.color.yellow};
  border: none;
  width: 80px;
  height: 70%;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: bold;

  @media screen and (max-width: 400px) {
    font-size: 0.8rem;
  }
`;

const CancelBtn = styled(ColorBtn)`
  width: 80px;
  height: 70%;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  margin-right: 20px;

  @media screen and (max-width: 400px) {
    font-size: 0.8rem;
  }
`;

function SignupBtnsStyle ({ onCancelClick }) {
  return (
    <BtnBox>
      <CancelBtn onClick={onCancelClick}> 취소 </CancelBtn>
      <SignupBtn type="submit"> 회원가입 </SignupBtn>
    </BtnBox>
  );
}

export default SignupBtnsStyle;