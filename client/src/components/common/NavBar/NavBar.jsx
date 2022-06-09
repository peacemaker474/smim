import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginOpen } from '../../../redux/toggle/action';
import { logoutUser } from '../../../redux/login/action';
import NavBarStyle from './NavBar.style';


function NavBar() {
  const menuToggled = useSelector((state) => state.toggleReducer.menuToggled);
  const loginToggled = useSelector((state) => state.toggleReducer.loginToggled);
  const loginState = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    dispatch(loginOpen());
  };

  const handleLogoutClick = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <NavBarStyle
      menuToggled={menuToggled}
      loginToggled={loginToggled}
      loginState={loginState}
      onLoginClick={handleLoginClick}
      onLogoutClick={handleLogoutClick}
    />
  );
}

export default NavBar;
