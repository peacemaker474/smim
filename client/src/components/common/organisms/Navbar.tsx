import styled from 'styled-components';
import MainLogo from '../molecules/MainLogo';
import NavLists from '../molecules/NavLists';

function Navbar () {
  return (
    <NavContainer>
      <NavWrapper>
        <MainLogo />
        <NavLists />
      </NavWrapper>
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