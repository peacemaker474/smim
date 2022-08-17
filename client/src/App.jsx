import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { isLoginCheckToggle, loginToggle } from './redux/slice/toggleSlice';
import PostWriteBtn from './components/post/PostWriteBtn/PostWriteBtn';
import NavBar from './components/common/NavBar/NavBar';
import AppRoute from './routes/AppRoute';
import Modal from './components/common/Modal/Modal';
import LoginSection from './components/login/LoginSection/LoginSection';
import Auth from './components/common/Auth/Auth';

function App() {
  const { authenticated } = useSelector((state) => state.authToken);
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

  const actionFunc = () => {
    dispatch(isLoginCheckToggle());
    dispatch(loginToggle());
  };

  const cancelFunc = () => {
    dispatch(isLoginCheckToggle());
  };

  return (
    <>
      {isLoginCheckToggled && (
        <Modal actionfunc={actionFunc} cancelFunc={cancelFunc}>
          {'로그인이 필요한 기능입니다.\n로그인하시겠습니까?'}
        </Modal>
      )}
      <NavBar />
      <Auth />
      {loginToggled && <LoginSection />}
      {authenticated && pathCheck !== 'create' && pathCheck !== 'edit' && <PostWriteBtn />}
      <AppRoute />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;

// 추후에 Oauth로 로그인을 하였을 시에 유저 정보나 비밀번호 변경 페이지로 가지 못하도록 설정해야 된다.
