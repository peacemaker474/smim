import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { getCookie } from './utils/cookie';
import { postCreateAccessToken } from './network/main/http';
import { DELETE_TOKEN, SET_TOKEN } from './redux/auth';
import { getUserLogOut } from './redux/services/UserService';
import { isLoginCheckToggle, loginToggle } from './redux/slice/toggleSlice';
import PostWriteBtn from './components/post/PostWriteBtn/PostWriteBtn';
import NavBar from './components/common/NavBar/NavBar';
import AppRoute from './routes/AppRoute';
import Modal from './components/common/Modal/Modal';
import LoginSection from './components/login/LoginSection/LoginSection';

function App() {
  const { authenticated, expireTime } = useSelector(
    (state) => ({
      authenticated: state.authToken.authenticated,
      expireTime: state.authToken.expireTime,
    }),
    shallowEqual
  );
  const { isLoginCheckToggled, loginToggled } = useSelector(
    (state) => ({
      isLoginCheckToggled: state.toggle.isLoginCheckToggled,
      loginToggled: state.toggle.loginToggled,
    }),
    shallowEqual
  );
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const pathCheck = pathname.split('/')[2];

  useEffect(() => {
    if (authenticated && expireTime - new Date().getTime() < 3000) {
      if (window.confirm('로그인 만료되셨습니다. 연장하시겠습니까?')) {
        let data = {
          refreshToken: getCookie(),
        };
        postCreateAccessToken(data).then((res) => {
          if (res.data.success) {
            dispatch(SET_TOKEN(res.data.accessToken));
          }
        });
      } else {
        dispatch(DELETE_TOKEN());
        dispatch(getUserLogOut());
      }
    }
  }, [authenticated, dispatch, expireTime, pathname]);

  return (
    <>
      {isLoginCheckToggled && (
        <Modal
          actionfunc={() => {
            dispatch(isLoginCheckToggle());
            dispatch(loginToggle());
          }}
          cancelFunc={() => dispatch(isLoginCheckToggle())}
        >
          {'로그인이 필요한 기능입니다.\n로그인하시겠습니까?'}
        </Modal>
      )}
      <NavBar />
      {loginToggled && <LoginSection />}
      {authenticated && pathCheck !== 'create' && pathCheck !== 'edit' && <PostWriteBtn />}
      <AppRoute />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;

// 추후에 Oauth로 로그인을 하였을 시에 유저 정보나 비밀번호 변경 페이지로 가지 못하도록 설정해야 된다.
