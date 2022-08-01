import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import MyProfile from '../components/mypage/MyProfile/MyProfile';

const MyPageSection = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: rgba(127, 127, 127, .09);
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
    height: 100%;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
  }

  @media screen and (min-width: 375px) {
    height: 70%;
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
