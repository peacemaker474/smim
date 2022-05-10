import React from 'react';
import { useSelector } from 'react-redux';
import PublicRoute from './routes/PublicRoute';
import NavBar from './components/common/NavBar';
import WriteBtn from './components/common/WriteBtn';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  const user = useSelector((state) => state.loginReducer);

  return (
    <>
      <NavBar />
      {user.isLogin && <WriteBtn />}
      {user.isLogin ? 
        <PublicRoute /> :
        <PrivateRoute />
      }
    </>
  );
}

export default App;

// 추후에 Oauth로 로그인을 하였을 시에 유저 정보나 비밀번호 변경 페이지로 가지 못하도록 설정해야 된다.