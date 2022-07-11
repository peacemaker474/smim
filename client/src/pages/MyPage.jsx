import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import MyProfile from '../components/mypage/MyProfile/MyProfile';

const MyPageSection = styled.section`
  display: flex;
  align-items: center;
  width: 85vw;
  height: 75vh;
  margin: 0 auto;
  margin-top: 15vh;
`;

export default function MyPage() {
  return (
    <MyPageSection>
      <MyProfile />
      <Outlet />
    </MyPageSection>
  );
}
