import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PublicRoute from './routes/PublicRoute';
import PostWriteBtn from './components/post/PostWriteBtn/PostWriteBtn';
import NavBar from './components/common/NavBar/NavBar';
import PrivateRoute from './routes/PrivateRoute';
import { getCookie } from './utils/cookie';
import { postCreateAccessToken } from './network/main/http';
import { DELETE_TOKEN, SET_TOKEN } from './redux/auth';
import { getUserLogOut } from './redux/services/UserService';

function App() {
  const user = useSelector((state) => state.user);
  const { authenticated } = useSelector((state) => state.authToken);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const pathCheck = pathname.split('/')[2];

  useEffect(() => {
    if (!authenticated && getCookie() !== undefined) {
      if (window.confirm("로그인이 만료되었습니다. 유지하겠습니까?")) {
        let data = {
          refreshToken: getCookie(),
        };
        postCreateAccessToken(data).then((res) => {
          if (res.data.success) {
            dispatch(SET_TOKEN(res.data.accessToken));
            setTimeout(() => {
              dispatch(DELETE_TOKEN());
            }, 600 * 1000)
          }
        })
      } else {
        dispatch(getUserLogOut());
      }
    }
  }, [user.id, authenticated])

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
