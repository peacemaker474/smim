import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(248, 249, 250, .9);
  border-radius: 5px;
`;

const LoginTitle = styled.h2`
  margin-left: 15px;
  color: ${({theme}) => theme.color.yellow};
`;

const CancelBtn = styled.button`
  all: unset;
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
`;

function LoginHeaderStyle ({ onLoginClose }) {
  return (
    <Header>
      <LoginTitle> 스며들다 </LoginTitle>
      <CancelBtn onClick={onLoginClose}> ❌ </CancelBtn>
    </Header>
  );
}

export default LoginHeaderStyle;