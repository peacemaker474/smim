import React from 'react';
import { useSelector } from 'react-redux';
import { ReactQueryDevtools } from 'react-query/devtools';
import AppRoute from './routes/AppRoute';
import LoginSection from './components/login/LoginSection/LoginSection';
import Auth from './components/common/Auth/Auth';

function App() {
  const { loginToggled } = useSelector((state) => state.toggle);

  return (
    <>
      <Auth />
      {loginToggled && <LoginSection />}
      <AppRoute />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;

// 추후에 Oauth로 로그인을 하였을 시에 유저 정보나 비밀번호 변경 페이지로 가지 못하도록 설정해야 된다.
