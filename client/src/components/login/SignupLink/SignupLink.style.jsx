import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SignBox = styled.div`
`;

const SignText = styled.span`
  font-size: 0.8rem;
  color: ${({theme}) => theme.color.gray};

  @media ${({ theme }) => theme.device.mobile } {
    font-size: 0.7rem;
  }
`;

const SignLink = styled(Link)`
  font-size: 0.9rem;
  color: ${({theme}) => theme.color.black};
  font-weight: bold;

  @media ${({ theme }) => theme.device.mobile } {
    font-size: 0.8rem;
  }
`;

function SignupLinkStyle ({ onLoginClose }) {
  return (
    <SignBox>
      <SignText> 아직 회원이 아니신가요? </SignText>
      <SignLink to="/signup" onClick={onLoginClose}> 회원가입 </SignLink>
    </SignBox>
  );
}

export default SignupLinkStyle;