import React from 'react';
import styled from 'styled-components';
import { BorderBtn, ColorBtn } from '../../../styles/common/buttons';

const BtnBox = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
`;

const SignupBtn = styled(ColorBtn)`
  width: 80px;
  height: 67%;
  font-size: 16px;
  font-weight: 500;
  margin-right: 20px;
  @media screen and (max-width: 400px) {
    font-size: 0.8rem;
  }
`;

const CancelBtn = styled(BorderBtn)`
  width: 80px;
  height: 67%;
  font-size: 0.9rem;
  font-weight: 500;
  @media screen and (max-width: 400px) {
    font-size: 0.8rem;
  }
`;

function SignupBtnsStyle({ onCancelClick }) {
  return (
    <BtnBox>
      <SignupBtn type='submit' palette='yellow'>
        회원가입
      </SignupBtn>
      <CancelBtn onClick={onCancelClick} palette='yellow'>
        취소
      </CancelBtn>
    </BtnBox>
  );
}

export default SignupBtnsStyle;
