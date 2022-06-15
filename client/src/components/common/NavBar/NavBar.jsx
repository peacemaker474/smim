import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginToggle, menuToggle } from '../../../redux/slice/toggleSlice';
import { getUserLogOut } from '../../../redux/services/UserService';
import NavBarStyle from './NavBar.style';

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
    dispatch(getUserLogOut());
    navigate('/');
  };

  const handleToggleClick = () => {
    dispatch(menuToggle());
  }

  console.log(loginState);
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
