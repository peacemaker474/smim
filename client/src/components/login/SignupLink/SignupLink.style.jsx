import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SignBox = styled.div`
  padding-top: 5px;
`;

const SignText = styled.span`
  font-size: 0.8em;
  color: ${({theme}) => theme.color.gray};

  @media screen and (max-width: 400px) {
    font-size: 0.7em;
  }
`;

const SignLink = styled(Link)`
  font-size: 0.9em;
  color: ${({theme}) => theme.color.black};
  font-weight: bold;

  @media screen and (max-width: 400px) {
    font-size: 0.8em;
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