import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginToggle, menuToggle } from '../../../redux/slice/toggleSlice';
import { getUserLogOut } from '../../../redux/services/UserService';
import { DELETE_TOKEN } from '../../../redux/auth';
import { deleteCookie } from '../../../utils/cookie';
import NavBarStyle from './NavBar.style';
import useDropdown from '../../../hooks/useDropdown';

function NavBar() {
  const { menuToggled } = useSelector((state) => state.toggle);
  const { authenticated } = useSelector((state) => state.authToken);
  const { imgUrl } = useSelector((state) => state.user);
  const [ isDropdownVisible, dropdownRef, btnRef, handleDropdownShow ] = useDropdown();
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
    handleDropdownShow();
    if (menuToggled) dispatch(menuToggle());
    navigate('/');

  }, [dispatch, navigate, menuToggled, handleDropdownShow]);

  const handleToggleClick = useCallback(() => {
    dispatch(menuToggle());
  }, [dispatch]);

  const handleMyPageClick = () => {
    handleDropdownShow();
  };

  return (
    <NavBarStyle
      menuToggled={menuToggled}
      authenticated={authenticated}
      imgUrl={imgUrl}
      isDropdownVisible={isDropdownVisible}
      dropdownRef={dropdownRef}
      btnRef={btnRef}
      pathname={search ? `${pathname}${search}` : `${pathname}`}
      onLoginClick={handleLoginClick}
      onLogoutClick={handleLogoutClick}
      onToggleClick={handleToggleClick}
      onMyPageClick={handleMyPageClick}
    />
  );
}

export default NavBar;