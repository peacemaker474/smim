import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getCookie } from './utils/cookie';
import { postCreateAccessToken } from './network/main/http';
import { DELETE_TOKEN, SET_TOKEN } from './redux/auth';
import { getUserLogOut } from './redux/services/UserService';
import { isLoginCheckToggle, loginToggle } from './redux/slice/toggleSlice';
import PostWriteBtn from './components/post/PostWriteBtn/PostWriteBtn';
import NavBar from './components/common/NavBar/NavBar';
import CheckRoute from './routes/CheckRoutes';
import Modal from './components/common/Modal/Modal';

function App() {
  const timer = useRef(null);
  const { loginCheck } = useSelector((state) => state.user);
  const { authenticated } = useSelector((state) => state.authToken);
  const { isLoginCheckToggled } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const pathCheck = pathname.split('/')[2];

  useEffect(() => {
    if (authenticated) {
      timer.current = setTimeout(() => {
        dispatch(DELETE_TOKEN());
        if (window.confirm('로그인이 만료되었습니다. 유지하겠습니까?')) {
          let data = {
            refreshToken: getCookie(),
          };
          postCreateAccessToken(data).then((res) => {
            if (res.data.success) {
              dispatch(SET_TOKEN(res.data.accessToken));
            }
          });
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
  }, [authenticated, dispatch, loginCheck, timer]);

  return (
    <>
      {isLoginCheckToggled ? (
        <Modal
          actionfunc={() => {
            dispatch(isLoginCheckToggle());
            dispatch(loginToggle());
          }}
          cancelFunc={() => dispatch(isLoginCheckToggle())}
        >
          {'로그인이 필요한 기능입니다.로그인하시겠습니까?'}
        </Modal>
      ) : null}
      <NavBar />
      {pathCheck !== 'create' && pathCheck !== 'edit' && <PostWriteBtn />}
      <CheckRoute />
    </>
  );
}

export default App;

// 추후에 Oauth로 로그인을 하였을 시에 유저 정보나 비밀번호 변경 페이지로 가지 못하도록 설정해야 된다.
