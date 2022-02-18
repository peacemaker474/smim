import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { loginOpen } from '../../redux/toggle/action';
import Toggle from './Toggle';
import LoginSection from '../login/LoginSection';
import MobileNavBar from './MobileNavBar';

const NavContainer = styled.nav`
  width: 100vw;
  height: 10vh;
  position: fixed;
  top: 0%;
  left: 0%;
  background-color: white;
  box-shadow: rgb(0 0 0 / 50%) 0 -3px 16px 1px;
`;

const NavBox = styled.div`
  width: 95%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLogo = styled.div`
  margin-left: 10px;
`;

const NavTitle = styled(Link)`
  font-size: 28px;
  color: ${({theme}) => theme.color.yellow};
  text-decoration: none;
  @media screen and (max-width: 320px){
    font-size: 20px;
  }
`;

const NavLists = styled.ul`
  width: 70%;
  height: 100%;
  display: grid;
  grid-template-columns: 110px 110px 110px 110px 110px 110px 150px;
  grid-gap: 1.5%;
  align-items: center;
  @media screen and (max-width: 1065px) {
    grid-template-columns: 80px 80px 80px 80px 80px 80px 150px;
  }
  @media ${({theme}) => theme.device.ipad} {
    display: none;
  }
`;

const NavList = styled.li`
  padding-left: 5px;
`;

const ListLink = styled(Link)`
  font-size: 17px;
  text-decoration: none;
  color: ${({theme}) => theme.color.gray};
  &:hover {
    font-weight: bold;
  }
  padding-bottom: 5px;
  font-weight: ${({current}) => current ? `bold` : `none`};
  border-bottom: 2px solid ${({current, theme}) => current ? `${theme.color.lightGray}` : "transparent"};
`;

const SignLink = styled.span`
  font-size: 18px;
  color: ${({theme}) => theme.color.black};
  font-weight: bold;
  cursor: pointer;
`;

function NavBar () {
  const {pathname} = useLocation(null);
  const menuToggled = useSelector((state) => state.toggleReducer.menuToggled);
  const loginToggled = useSelector((state) => state.toggleReducer.loginToggled);
  const dispatch = useDispatch();
  const handleLoginModal = () => {
    dispatch(loginOpen());
  }

  return (
    <>
      <NavContainer>
        <NavBox>
          <NavLogo>
            <NavTitle to="/"> 스며들다 </NavTitle>
          </NavLogo>
          <NavLists>
            <NavList>
              <ListLink to="/post/view/generation10" current={pathname === "/post/view/generation10"}> 10대에게 </ListLink>
            </NavList>
            <NavList>
              <ListLink to="/post/view/generation20" current={pathname === "/post/view/generation20"}> 20대에게 </ListLink>
            </NavList>
            <NavList>
              <ListLink to="/post/view/generation30" current={pathname === "/post/view/generation30"}> 30대에게 </ListLink>
            </NavList>
            <NavList>
              <ListLink to="/post/view/generation40" current={pathname === "/post/view/generation40"}> 40대에게 </ListLink>
            </NavList>
            <NavList>
              <ListLink to="/post/view/generation50" current={pathname === "/post/view/generation50"}> 50대에게 </ListLink>
            </NavList>
            <NavList>
              <ListLink to="/post/view/generation60" current={pathname === "/post/view/generation60"}> 60대에게 </ListLink>
            </NavList>
            <NavList>
              <SignLink onClick={handleLoginModal}> 로그인/회원가입 </SignLink>
            </NavList>
          </NavLists>
          <Toggle />
        </NavBox>
      </NavContainer>
      {loginToggled && <LoginSection />}
      {menuToggled && <MobileNavBar />}
    </>
  );
}

export default NavBar;