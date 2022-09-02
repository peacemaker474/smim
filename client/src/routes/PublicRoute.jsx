import React, { useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoginCheckToggle, loginToggle } from '../redux/slice/toggleSlice';
import Modal from '../components/common/Modal/Modal';
import NavBar from '../components/common/NavBar/NavBar';
import PostWriteBtn from '../components/post/PostWriteBtn/PostWriteBtn';

function PublicRoute() {
  const { isLoginCheckToggled } = useSelector((state) => state.toggle);
  const { authenticated } = useSelector((state) => state.authToken);
  const dispatch = useDispatch();

  const actionFunc = useCallback(() => {
    dispatch(isLoginCheckToggle());
    dispatch(loginToggle());
  }, [dispatch]);

  const cancelFunc = useCallback(() => {
    dispatch(isLoginCheckToggle());
  }, [dispatch]);

  return (
    <>
      <NavBar />
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
