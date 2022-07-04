import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function NotFound() {
  let naivgate = useNavigate();

  const handlegoBack = () => {
    naivgate(-1);
  };

  const handlegoHome = () => {
    naivgate('/');
  };

  return (
    <NotFoundBody>
      <NotFoundContent>
        <h2>404 Page</h2>
        <p>페이지를 찾을 수 없습니다.</p>
        <button onClick={handlegoHome}>홈</button>
        <button onClick={handlegoBack}>뒤로가기</button>
      </NotFoundContent>
    </NotFoundBody>
  );
}

const NotFoundBody = styled.div`
  width: 100%;
  padding: 257px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotFoundContent = styled.div``;
