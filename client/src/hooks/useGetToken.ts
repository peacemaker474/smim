import { useEffect } from 'react';
import { getCreateAccessToken } from '../networks/main/http';
import { useAppDispatch } from '../redux/hooks';
import { SET_TOKEN } from '../redux/slice/authSlice';

function useGetToken() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getCreateAccessToken().then((res) => {
      if (res.data.success) {
        dispatch(SET_TOKEN(res.data.accessToken));
      }
    });
  }, [dispatch]);
}

export default useGetToken;
