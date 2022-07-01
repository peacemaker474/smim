import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getCookie } from './utils/cookie';
import { postCreateAccessToken } from './network/main/http';
import { DELETE_TOKEN, SET_TOKEN } from './redux/auth';
import { getUserLogOut } from './redux/services/UserService';
import PrivateRoute from './routes/PrivateRoutes';
import PostWriteBtn from './components/post/PostWriteBtn/PostWriteBtn';
import NavBar from './components/common/NavBar/NavBar';
import PublicRoute from './routes/PublicRoutes';

function App() {
  const timer = useRef(null);
  const { loginCheck } = useSelector((state) => state.user);
  const { authenticated } = useSelector((state) => state.authToken);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const pathCheck = pathname.split('/')[2];

  useEffect(() => {
    if ( authenticated ) {
      timer.current = setTimeout(() => {
        dispatch(DELETE_TOKEN());
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
      }, 600 * 1000);
    }

    // if (!authenticated && loginCheck && getCookie() !== undefined) {
    //   if (window.confirm("로그인이 만료되었습니다. 유지하겠습니까?")) {
    //     let data = {
    //       refreshToken: getCookie(),
    //     };
    //     postCreateAccessToken(data).then((res) => {
    //       if (res.data.success) {
    //         dispatch(SET_TOKEN(res.data.accessToken));
    //       }
    //     })
    //   } else {
    //     dispatch(getUserLogOut());
    //   }
    // }

    return () => clearTimeout(timer.current);
  }, [authenticated, dispatch, loginCheck, timer])

  return (
    <>
      <NavBar />
      {authenticated && pathCheck !== 'create' && pathCheck !== 'edit' && <PostWriteBtn />}
      {authenticated ? <PrivateRoute /> : <PublicRoute />}
    </>
  );
}

export default App;

// 추후에 Oauth로 로그인을 하였을 시에 유저 정보나 비밀번호 변경 페이지로 가지 못하도록 설정해야 된다.
