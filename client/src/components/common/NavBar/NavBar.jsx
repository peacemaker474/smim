import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginToggle, menuToggle } from '../../../redux/slice/toggleSlice';
import { getUserLogOut } from '../../../redux/services/UserService';
import { DELETE_TOKEN } from '../../../redux/auth';
import NavBarStyle from './NavBar.style';
import { deleteCookie } from '../../../utils/cookie';

function NavBar() {
  const menuToggled = useSelector((state) => state.toggle.menuToggled);
  const loginToggled = useSelector((state) => state.toggle.loginToggled);
  const loginState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    dispatch(loginToggle());
  };

  const handleLogoutClick = () => {
    deleteCookie("users");
    dispatch(getUserLogOut());
    dispatch(DELETE_TOKEN());
    navigate('/');
  };

  const handleToggleClick = () => {
    dispatch(menuToggle());
  }
  return (
    <NavBarStyle
      menuToggled={menuToggled}
      loginToggled={loginToggled}
      loginState={loginState}
      onLoginClick={handleLoginClick}
      onLogoutClick={handleLogoutClick}
      onToggleClick={handleToggleClick}
    />
  );
}

export default NavBar;
