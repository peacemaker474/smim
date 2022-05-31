import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SignBox = styled.div`
`;

const SignText = styled.span`
  font-size: 13px;
  color: ${({theme}) => theme.color.gray};
`;

const SignLink = styled(Link)`
  font-size: 15px;
  color: ${({theme}) => theme.color.black};
  font-weight: bold;
`;

function SignupLink ({onLoginClose}) {
  return (
    <SignBox>
      <SignText> 아직 회원이 아니신가요? </SignText>
      <SignLink to="/signup" onClick={onLoginClose}> 회원가입 </SignLink>
    </SignBox>
  )
}

export default SignupLink;