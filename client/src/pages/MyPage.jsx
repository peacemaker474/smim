import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import MyProfile from '../components/mypage/MyProfile/MyProfile';

const MyPageSection = styled.section`
  width: 100vw;
  height: 100vh;
  min-height: 640px;
  background-color: rgba(127, 127, 127, 0.09);
  position: relative;
`;

const MyPageOverlay = styled.div`
  max-width: 1060px;
  max-height: 740px;
  width: 60%;
  height: 75%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  top: 17.5%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 50%) 0 6px 23px -6px;

  @media screen and (max-width: 1180px) {
    width: 80%;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 1rem;
    gap: 1.5rem;
  }

  @media screen and (max-width: 769px) {
    width: 100%;
    height: 100%;
    max-height: none;
    top: 5%;
    padding-top: 2rem;
  }
`;

export default function MyPage() {
  return (
    <MyPageSection>
      <MyPageOverlay>
        <MyProfile />
        <Outlet />
      </MyPageOverlay>
    </MyPageSection>
  );
}
