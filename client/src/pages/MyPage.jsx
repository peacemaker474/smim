import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import MyInfo from '../components/mypage/Myinfo/MyInfo';
import MyProfile from '../components/mypage/MyProfile/MyProfile';
import MyWriteLists from '../components/mypage/MyWriteLists/MyWriteLists';
import BookMarkLists from '../components/mypage/BookMarkLists/BookMarkLists';
import PasswordChange from '../components/mypage/PasswordChange/PasswordChange';
import { useSelector } from 'react-redux';

const MyPageSection = styled.section`
  display: flex;
  align-items: center;
  width: 85vw;
  height: 75vh;
  margin: 0 auto;
  margin-top: 15vh;
`;

export default function MyPage() {
  const user = useSelector((state) => state.login);

  return (
    <MyPageSection>
      <MyProfile />
      <Routes>
        <Route path='/' element={<MyInfo />} />
        <Route path='writeLists' element={<MyWriteLists userId={user.id} />} />
        <Route path='favoriteLists' element={<BookMarkLists userId={user.id} />} />
        <Route path='changepw' element={<PasswordChange />} />
      </Routes>
    </MyPageSection>
  );
}
