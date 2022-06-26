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
  const { loginCheck } = useSelector((state) => state.user);
  const { authenticated } = useSelector((state) => state.authToken);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const pathCheck = pathname.split('/')[2];

  useEffect(() => {
    let startTimer = setTimeout(() => {
      dispatch(DELETE_TOKEN());
    }, 10000);

    if (!authenticated) return clearTimeout(startTimer);

  }, [authenticated, dispatch])

  useEffect(() => {
    if (!authenticated && getCookie() !== undefined && loginCheck) {
      if (window.confirm("로그인이 만료되었습니다. 유지하겠습니까?")) {
        let data = {
          refreshToken: getCookie(),
        };
        postCreateAccessToken(data).then((res) => {
          if (res.data.success) {
            dispatch(SET_TOKEN(res.data.accessToken));
          }
        })
      } else {
        dispatch(getUserLogOut());
      }
    }
  }, [authenticated, dispatch, loginCheck])

  return (
    <>
      <NavBar />
      {authenticated && pathCheck !== 'create' && pathCheck !== 'edit' && <PostWriteBtn />}
      {authenticated ? <PublicRoute /> : <PrivateRoute />}
    </>
  );
}

export default App;

// 추후에 Oauth로 로그인을 하였을 시에 유저 정보나 비밀번호 변경 페이지로 가지 못하도록 설정해야 된다.
