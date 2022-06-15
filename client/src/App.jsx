import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PublicRoute from './routes/PublicRoute';
import PostWriteBtn from './components/post/PostWriteBtn/PostWriteBtn';
import NavBar from './components/common/NavBar/NavBar';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  const user = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const pathCheck = pathname.split('/')[2];

  return (
    <>
      <NavBar />
      {user.isLogin && pathCheck !== 'create' && pathCheck !== 'edit' && <PostWriteBtn />}
      {user.isLogin ? <PublicRoute /> : <PrivateRoute />}
    </>
  );
}

export default App;

// 추후에 Oauth로 로그인을 하였을 시에 유저 정보나 비밀번호 변경 페이지로 가지 못하도록 설정해야 된다.
