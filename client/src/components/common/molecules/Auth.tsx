import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getCreateAccessToken } from '../../../networks/main/http';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getUserLogOut } from '../../../redux/services/UserService';
import { DELETE_TOKEN, SET_TOKEN } from '../../../redux/slice/authSlice';

function Auth() {
  const { authenticated, expireTime } = useAppSelector(
    (state) => ({
      authenticated: state.auth.authenticated,
      expireTime: state.auth.expireTime,
    }),
    shallowEqual
  );

  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (authenticated && expireTime - new Date().getTime() < 3000) {
      if (window.confirm('로그인 만료되셨습니다. 연장하시겠습니까?')) {
        getCreateAccessToken().then((res) => {
          if (res.data.success) {
            dispatch(SET_TOKEN(res.data.accessToken));
          }
        });
      } else {
        dispatch(DELETE_TOKEN());
        dispatch(getUserLogOut());
      }
    }
  }, [pathname, authenticated, dispatch, expireTime]);

  return (
    <>
    </>
  );
}

export default Auth;