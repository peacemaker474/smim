import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import MyProfile from '../components/mypage/MyProfile/MyProfile';

const MyPageSection = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: rgba(127, 127, 127, .09);
`;

const MyPageOverlay = styled.div`
  width: 60%;
  height: 75%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  top: 17.5%;
  left: 20%;
  // transform: translate(-50%, -60%);
  background-color: white;
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 50%) 0 6px 23px -6px;
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
