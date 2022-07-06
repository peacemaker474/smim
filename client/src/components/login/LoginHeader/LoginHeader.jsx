import React from 'react';
import LoginHeaderStyle from './LoginHeader.style';

/* 
1. 리덕스를 활용해서 LoginModal 값 관리
2. 반응형을 고려한 각각의 디테일
*/

function LoginHeader ({onLoginClose}) {
  return (
    <LoginHeaderStyle
      onLoginClose={onLoginClose}
    />
  );
}

export default LoginHeader;