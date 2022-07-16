import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Toggle from './Toggle';
import MobileNavBar from './MobileNavBar';
import LoginSection from '../../login/LoginSection/LoginSection';

const NavContainer = styled.nav`
  width: 100vw;
  height: 10vh;
  position: fixed;
  top: 0%;
  left: 0%;
  background-color: white;
  box-shadow: rgb(0 0 0 / 50%) 0 -3px 16px 1px;
  z-index: 2;
`;

const NavWrapper = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLogoBox = styled.div`
`;

const NavMainTitle = styled(Link)`
  font-size: 1.7rem;
  color: ${({ theme }) => theme.color.yellow};
  text-decoration: none;
  cursor: pointer;
  @media screen and (max-width: 320px) {
    font-size: 20px;
  }
`;

const NavLists = styled.ul`
  width: ${({ login }) => login ? "70%" : "63%"};
  height: 100%;
  display: grid;
  grid-template-columns: repeat(7, 120px);
  grid-gap: 0.5%;
  align-items: center;
  @media screen and (max-width: 1065px) {
    grid-template-columns: 80px 80px 80px 80px 80px 80px 150px;
  }
  @media ${({ theme }) => theme.device.ipad} {
    display: none;
  }
`;

const NavList = styled.li`
  padding-left: 5px;
`;

const GenerationLink = styled(Link)`
  font-size: 17px;
  text-decoration: none;
  color: ${({ theme }) => theme.color.gray};
  &:hover {
    font-weight: bold;
  }
  padding-bottom: 5px;
  font-weight: ${({ current }) => (current ? `bold` : `none`)};
  border-bottom: 2px solid
    ${({ current, theme }) => (current ? `${theme.color.lightGray}` : 'transparent')};
`;

const LoginLink = styled.span`
  font-size: 18px;
  color: ${({ theme }) => theme.color.black};
  font-weight: bold;
  cursor: pointer;
`;

function NavBarStyle ({ menuToggled, pathname, loginToggled, authenticated, social, onLoginClick, onLogoutClick, onToggleClick}) {
  return (
    <>
      <NavContainer>
        <NavWrapper>
          <NavLogoBox>
            <NavMainTitle to="/"> 스며들다 </NavMainTitle>
          </NavLogoBox>
          <NavLists login={authenticated}>
            <NavList>
              <GenerationLink to='/generation?age=10' current={pathname === '/generation?age=10'}>
                10대에게
              </GenerationLink>
            </NavList>
            <NavList>
              <GenerationLink to='/generation?age=20' current={pathname === '/generation?age=20'}>
                20대에게
              </GenerationLink>
            </NavList>
            <NavList>
              <GenerationLink to='/generation?age=30' current={pathname === '/generation?age=30'}>
                30대에게
              </GenerationLink>
            </NavList>
            <NavList>
              <GenerationLink to='/generation?age=40' current={pathname === '/generation?age=40'}>
                40대에게
              </GenerationLink>
            </NavList>
            <NavList>
              <GenerationLink to='/generation?age=50' current={pathname === '/generation?age=50'}>
                50대에게
              </GenerationLink>
            </NavList>
            {!authenticated ? (
              <NavList>
                <LoginLink onClick={onLoginClick}> 로그인/회원가입 </LoginLink>
              </NavList>
            ) : (
              <>
                {!social ? (
                  <NavList>
                    <GenerationLink to='/my' current={pathname === "/my"}> 마이페이지 </GenerationLink>
                  </NavList>
                ) : (
                  <NavList>
                    <GenerationLink to='/my/writeLists'> 마이페이지 </GenerationLink>
                  </NavList>
                )}
                <NavList>
                  <LoginLink onClick={onLogoutClick}> 로그아웃 </LoginLink>
                </NavList>
              </>
            )}
          </NavLists>
          <Toggle
            menuToggled={menuToggled}
            onToggleClick={onToggleClick}
          />
        </NavWrapper>
      </NavContainer>
      {loginToggled && <LoginSection />}
      {menuToggled && <MobileNavBar />}
    </>
  );
}

export default React.memo(NavBarStyle);