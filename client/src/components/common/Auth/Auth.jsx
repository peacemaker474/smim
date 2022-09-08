import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getCreateAccessToken } from '../../../network/main/http';
import { DELETE_TOKEN, SET_TOKEN } from '../../../redux/auth';
import { getUserLogOut } from '../../../redux/services/UserService';

function Auth() {
  const { authenticated, expireTime } = useSelector(
    (state) => ({
      authenticated: state.authToken.authenticated,
      expireTime: state.authToken.expireTime,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();
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

  return <></>;
}

export default Auth;
