import { useCallback, useEffect } from 'react';
import { getCreateAccessToken } from '../../../networks/main/http';
import { useAppDispatch, useAppSelectorTyped } from '../../../redux/hooks';
import { getUserLogOut } from '../../../redux/services/UserService';
import { DELETE_TOKEN, SET_TOKEN } from '../../../redux/slice/authSlice';

function Auth() {
  const { authenticated, expireTime } = useAppSelectorTyped((state) => ({
    authenticated: state.auth.authenticated,
    expireTime: state.auth.expireTime,
  }));

  const dispatch = useAppDispatch();

  const settingToken = useCallback(() => {
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
  }, [dispatch]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (!timer && authenticated) {
      timer = setTimeout(settingToken, expireTime - new Date().getTime());
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [settingToken, authenticated, dispatch, expireTime]);

  return (
    <>
    </>
  );
}

export default Auth;
