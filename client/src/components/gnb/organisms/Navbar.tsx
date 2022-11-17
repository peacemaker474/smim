import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getUserLogOut } from '../../../redux/services/UserService';
import { DELETE_TOKEN } from '../../../redux/slice/authSlice';
import { menuToggle } from '../../../redux/slice/toggleSlice';
import Toggle from '../atoms/Toggle';
import MainLogo from '../molecules/MainLogo';
import NavLists from '../molecules/NavLists';
import AppNavBar from './AppNavBar';

export type LogoutCb = () => void;
type LOGOUT = (cb?: LogoutCb | undefined) => () => void;

function Navbar () {
  const { menuToggled } = useAppSelector(state => state.toggle);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogoutClick: LOGOUT = useCallback((cb) => () => {
    dispatch(getUserLogOut());
    dispatch(DELETE_TOKEN());
    if (cb) cb();
    if (menuToggled) dispatch(menuToggle());

    navigate('/');
  }, [dispatch, menuToggled, navigate])


  return (
    <NavContainer>
      <NavWrapper>
        <MainLogo />
        <NavLists handleLogoutClick={handleLogoutClick}/>
        <Toggle />
      </NavWrapper>
      {menuToggled && <AppNavBar handleLogoutClick={handleLogoutClick}/>}
    </NavContainer>
  );
}

export default Navbar;

const NavContainer = styled.nav`
  width: 100vw;
  height: 80px;
  position: fixed;
  top: 0%;
  left: 0%;
  background-color: white;
  box-shadow: rgb(0 0 0 / 50%) 0 -3px 16px 1px;
  z-index: 999;
`;

const NavWrapper = styled.div`
  max-width: 1180px;
  width: 95%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;