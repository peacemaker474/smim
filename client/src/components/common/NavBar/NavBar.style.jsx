import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Toggle from './Toggle';
import MobileNavBar from './MobileNavBar';
import LoginSection from '../../login/LoginSection/LoginSection';
import UserImage from '../UserImage/UserImage';
import DownArrow from '../../../asset/icon/icon-down.svg';
import MyPageModal from './MyPageModal';

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
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLogoBox = styled.div`
  width: 120px;
  height: 40px;
  padding-left: 10px;
  line-height: 40px;
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
  height: 100%;
  display: grid;
  grid-template-columns: ${({ login }) => login ? "5em 5em 5em 5em 5em 5em;" : "5em 5em 5em 5em 5em 5em;"}
  grid-gap: 2em;
  align-items: center;
  position: relative;
  @media ${({ theme }) => theme.device.ipad} {
    display: none;
  }
`;

const NavList = styled.li`
  &:nth-child(6) {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;

const GenerationLink = styled(Link)`
  font-size: 1em;
  text-decoration: none;
  color: ${({ theme, current }) => (current ? `${theme.color.black}` : `${theme.color.gray}`)};
  transition: all 0.3s ease 0s;
  &:hover {
    font-weight: bold;
    color: ${({ theme }) => theme.color.black};
  }
  padding-bottom: 5px;
  font-weight: ${({ current }) => (current ? `bold` : `none`)};
  border-bottom: 2px solid
    ${({ current, theme }) => (current ? `${theme.color.black}` : 'transparent')};
`;

const LoginLink = styled.span`
  font-size: 18px;
  color: ${({ theme }) => theme.color.black};
  font-weight: bold;
  cursor: pointer;
`;

const DownButton = styled.div`
  width: 25px;
  height: 25px;
  background-image: url(${DownArrow});
  background-repeat: no-repeat;
  background-size: cover;
`;

function NavBarStyle ({ menuToggled, pathname, isDropdownVisible, dropdownRef, btnRef, loginToggled, imgUrl, authenticated, onLoginClick, onLogoutClick, onToggleClick, onMyPageClick}) {  
  return (
    <>
      <NavContainer>
        <NavWrapper>
          <NavLogoBox>
            <NavMainTitle to="/"> 스며들다 </NavMainTitle>
          </NavLogoBox>
          <NavLists>
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
                <LoginLink onClick={onLoginClick}> 로그인 </LoginLink>
              </NavList>
            ) : (
              <NavList onClick={onMyPageClick} ref={btnRef}>
                <UserImage
                  width={"50%"}
                  height={"50%"}
                  imgUrl={imgUrl}
                />
                <DownButton />
                {isDropdownVisible && 
                  <MyPageModal
                  ref={dropdownRef}
                  onMyPageClick={onMyPageClick}
                  onLogoutClick={onLogoutClick}
                />}
              </NavList>
            )}
          </NavLists>
          <Toggle
            menuToggled={menuToggled}
            onToggleClick={onToggleClick}
          />
        </NavWrapper>
      </NavContainer>
      {loginToggled && <LoginSection />}
      {menuToggled && <MobileNavBar onLogoutClick={onLogoutClick}/>}
    </>
  );
}

export default React.memo(NavBarStyle);