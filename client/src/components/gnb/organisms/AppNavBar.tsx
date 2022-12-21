import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { loginToggle, menuToggle } from '../../../redux/slice/toggleSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { LogoutCb } from './Navbar';

interface AppProps {
  handleLogoutClick: (cb?: LogoutCb | undefined) => () => void;
}

function AppNavBar ({ handleLogoutClick }: AppProps) {
  const { authenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLoginClick = () => {
    dispatch(loginToggle());
  };

  const handleMenuClick = () => {
    dispatch(menuToggle());
  }

  return (
    <MobileNavBox>
      <MobileLists onClick={handleMenuClick}>
        {!authenticated ? (
          <MobileList>
            <MobileSignBox>
              <MobileSignIn onClick={handleLoginClick}> 로그인 하기 </MobileSignIn>
              <MobileSignUpTitle> 아직 회원이 아니신가요? </MobileSignUpTitle>
              <MobileSignUp to='signup'> 회원가입 </MobileSignUp>
            </MobileSignBox>
          </MobileList>
        ) : (
          <>
            <MobileList>
              <MobileLink to='post/create'> 새 글 작성 </MobileLink>
            </MobileList>
            <MobileList>
              <MobileLink to='my'> 마이페이지 </MobileLink>
            </MobileList>
          </>
        )}
        <MobileList>
          <MobileLink to='generation/10'> 10대에게 </MobileLink>
        </MobileList>
        <MobileList>
          <MobileLink to='generation/20'> 20대에게 </MobileLink>
        </MobileList>
        <MobileList>
          <MobileLink to='generation/30'> 30대에게 </MobileLink>
        </MobileList>
        <MobileList>
          <MobileLink to='generation/40'> 40대에게 </MobileLink>
        </MobileList>
        <MobileList>
          <MobileLink to='generation/50'> 50대에게 </MobileLink>
        </MobileList>
        {authenticated && (
          <MobileList>
            <MobileLink to='/' onClick={handleLogoutClick()}>
              로그아웃
            </MobileLink>
          </MobileList>
        )}
      </MobileLists>
    </MobileNavBox>
  );
}

export default AppNavBar;

const MobileNavBox = styled.section`
  width: 35vw;
  height: 100vh;
  position: fixed;
  top: 6%;
  right: 0;
  z-index: 999;
  background-color: white;
  display: none;
  @media ${({ theme }) => theme.device.ipad} {
    display: block;
    box-shadow: rgb(0 0 0 / 50%) -16px 0px 16px -16px;
  }
  @media screen and (max-height: 796px) {
    top: 10%;
  }
`;

const MobileLists = styled.ul`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
`;

const MobileList = styled.li`
  width: 80%;
  height: 100%;
  margin: 0 auto;
  padding: 20px 20px 0 0;
`;

const MobileLink = styled(Link)`
  font-size: 1.1rem;
  text-decoration: none;
  color: ${({ theme }) => theme.color.black};
  cursor: pointer;
  transition: all 0.3s ease 0s;
  &:hover {
    font-weight: bold;
    font-size: 1.2rem;
  }
  @media ${({ theme }) => theme.device.iphoneSE} {
    font-size: 1rem;
  }
  @media ${({ theme }) => theme.device.fold} {
    font-size: 0.9rem;
  }
`;

const MobileSignBox = styled.div`
  width: 90%;
  @media ${({ theme }) => theme.device.iphoneSE} {
    width: 95%;
  }
  @media ${({ theme }) => theme.device.fold} {
    width: 100%;
  }
`;

const MobileSignIn = styled.h2`
  font-size: 1.1rem;
  margin: 10px 0;
  cursor: pointer;
  @media ${({ theme }) => theme.device.iphoneSE} {
    font-size: 0.9rem;
    margin: 5px 0;
  }
  @media ${({ theme }) => theme.device.fold} {
    font-size: 0.8rem;
  }
`;

const MobileSignUpTitle = styled.p`
  font-size: 0.6rem;
  color: ${({ theme }) => theme.color.black};
  font-weight: 500;
  margin-bottom: 5px;
  @media ${({ theme }) => theme.device.iphoneSE} {
    display: block;
    font-size: 0.5rem;
  }
`;

const MobileSignUp = styled(Link)`
  color: ${({ theme }) => theme.color.black};
  font-weight: bold;
  font-size: 0.9rem;
  @media ${({ theme }) => theme.device.iphoneSE} {
    font-size: 0.7rem;
  }
`;