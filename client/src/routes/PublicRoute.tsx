import { useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { isLoginCheckToggle, loginToggle } from '../redux/slice/toggleSlice';
import Modal from '../components/common/molecules/Modal';
import Navbar from '../components/gnb/organisms/Navbar';
import PostWriteBtn from '../components/postCreate/atoms/WriteButton';

function PublicRoute() {
  const { isLoginCheckToggled } = useAppSelector((state) => state.toggle);
  const { authenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const actionFunc = useCallback(() => {
    dispatch(isLoginCheckToggle());
    dispatch(loginToggle());
  }, [dispatch]);

  const cancelFunc = useCallback(() => {
    dispatch(isLoginCheckToggle());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      {isLoginCheckToggled && (
        <Modal actionFunc={actionFunc} cancelFunc={cancelFunc}>
          {'로그인이 필요한 기능입니다.\n로그인하시겠습니까?'}
        </Modal>
      )}
      {authenticated && <PostWriteBtn />}
      <Outlet />
    </>
  );
}

export default PublicRoute;
