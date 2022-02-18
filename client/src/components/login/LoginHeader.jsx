import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { loginClose } from '../../redux/toggle/action';

/* 
1. 리덕스를 활용해서 LoginModal 값 관리
2. 반응형을 고려한 각각의 디테일
*/

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

function LoginHeader () {
  const dispatch = useDispatch();

  const handleLoginClose = () => {
    dispatch(loginClose());
  }
  return (
    <Header>
      <LoginTitle> 스며들다 </LoginTitle>
      <CancelBtn onClick={handleLoginClose}> ❌ </CancelBtn>
    </Header>
  );
}

export default LoginHeader;