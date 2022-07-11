import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginToggle, menuToggle } from '../../../redux/slice/toggleSlice';
import { getUserLogOut } from '../../../redux/services/UserService';
import { DELETE_TOKEN } from '../../../redux/auth';
import NavBarStyle from './NavBar.style';
import { deleteCookie } from '../../../utils/cookie';

function NavBar() {
  const menuToggled = useSelector((state) => state.toggle.menuToggled);
  const loginToggled = useSelector((state) => state.toggle.loginToggled);
  const { authenticated } = useSelector((state) => state.authToken);
  const { social } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation(null);

  const handleLoginClick = useCallback(() => {
    dispatch(loginToggle());
  }, [dispatch]);

  const handleLogoutClick = useCallback(() => {
    deleteCookie("users");
    dispatch(getUserLogOut());
    dispatch(DELETE_TOKEN());
    navigate('/');
  }, [dispatch, navigate]);

  const handleToggleClick = useCallback(() => {
    dispatch(menuToggle());
  }, [dispatch]);

  return (
    <NavBarStyle
      menuToggled={menuToggled}
      loginToggled={loginToggled}
      authenticated={authenticated}
      social={social}
      pathname={pathname}
      onLoginClick={handleLoginClick}
      onLogoutClick={handleLogoutClick}
      onToggleClick={handleToggleClick}
    />
  );
}

export default NavBar;
