import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import MyPage from '../pages/MyPage';
import MyInfo from '../components/mypage/Myinfo/MyInfo';
import MyWriteLists from '../components/mypage/MyWriteLists/MyWriteLists';
import BookMarkLists from '../components/mypage/BookMarkLists/BookMarkLists';
import PasswordChange from '../components/mypage/PasswordChange/PasswordChange';
import NotFound from '../pages/NotFound';

export default function MyPageRoute() {
  const { id: userId } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route element={<MyPage />}>
        <Route path='/' element={<MyInfo />} />
        <Route path='writeLists' element={<MyWriteLists userId={userId} />} />
        <Route path='bookMarkLists' element={<BookMarkLists userId={userId} />} />
        <Route path='changepw' element={<PasswordChange />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
