import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginToggle, menuToggle, myPageToggle } from '../../../redux/slice/toggleSlice';
import { getUserLogOut } from '../../../redux/services/UserService';
import { DELETE_TOKEN } from '../../../redux/auth';
import NavBarStyle from './NavBar.style';
import { deleteCookie } from '../../../utils/cookie';

function NavBar() {
  const menuToggled = useSelector((state) => state.toggle.menuToggled);
  const loginToggled = useSelector((state) => state.toggle.loginToggled);
  const myPageToggled = useSelector((state) => state.toggle.myPageToggled);
  const { authenticated } = useSelector((state) => state.authToken);
  const { imgUrl } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname, search } = useLocation(null);

  const handleLoginClick = useCallback(() => {
    dispatch(loginToggle());
  }, [dispatch]);

  const handleLogoutClick = useCallback(() => {
    deleteCookie("users");
    dispatch(getUserLogOut());
    dispatch(DELETE_TOKEN());
    dispatch(myPageToggle());
    navigate('/');
  }, [dispatch, navigate]);

  const handleToggleClick = useCallback(() => {
    dispatch(menuToggle());
  }, [dispatch]);

  const handleMyPageClick = useCallback((evt) => {
    dispatch(myPageToggle());
  })

  return (
    <NavBarStyle
      menuToggled={menuToggled}
      loginToggled={loginToggled}
      myPageToggled={myPageToggled}
      authenticated={authenticated}
      imgUrl={imgUrl}
      pathname={search ? `${pathname}${search}` : `${pathname}`}
      onLoginClick={handleLoginClick}
      onLogoutClick={handleLogoutClick}
      onToggleClick={handleToggleClick}
      onMyPageClick={handleMyPageClick}
    />
  );
}

export default NavBar;
