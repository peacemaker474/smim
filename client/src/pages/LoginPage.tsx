import { useCallback } from 'react';
import styled from 'styled-components';
import EtcBox from '../components/login/molecules/EtcBox';
import LoginForm from '../components/login/molecules/LoginForm';
import LoginHeader from '../components/login/molecules/LoginHeader';
import { useAppDispatch } from '../redux/hooks';
import { loginToggle } from '../redux/slice/toggleSlice';

function LoginPage () {
  const dispatch = useAppDispatch();

  const handleLoginClose = useCallback(() => {
    dispatch(loginToggle());
  }, [dispatch]);

  return (
    <LoginContainer>
      <LoginOverlay onClick={handleLoginClose}/>
      <LoginWrapper>
        <LoginHeader onLoginClose={handleLoginClose}/>
        <LoginForm />
        <EtcBox />
      </LoginWrapper>
    </LoginContainer>
  );
}

export default LoginPage;

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(12, 12, 12, 0.2);
`;

const LoginOverlay = styled.div`
  width: 100%;
  height: 100%;
`;

const LoginWrapper = styled.section`
  width: 23rem;
  height: 24rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 5px;
  @media ${({ theme }) => theme.device.mobile } {
    width: 16.5rem;
    height: 19rem;
  }
`;