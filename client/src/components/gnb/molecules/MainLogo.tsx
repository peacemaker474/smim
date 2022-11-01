import { Link } from 'react-router-dom';
import styled from 'styled-components';

function MainLogo () {
  return (
    <NavLogoBox>
      <NavMainTitle to="/"> 스며들다 </NavMainTitle>
    </NavLogoBox>
  );
}

export default MainLogo;

const NavLogoBox = styled.div`
  width: 170px;
  height: 40px;
`;

const NavMainTitle = styled(Link)`
  font-size: 1.9rem;
  color: ${({ theme }) => theme.color.yellow};
  text-decoration: none;
  cursor: pointer;
  line-height: 40px;
  @media ${({ theme }) => theme.device.ipad} {
    font-size: 1.8rem;
  }
  @media ${({ theme }) => theme.device.mobileMiddle} {
    font-size: 1.5rem;
  }
`;