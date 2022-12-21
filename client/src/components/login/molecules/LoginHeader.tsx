import styled from 'styled-components';

function LoginHeader ({ onLoginClose }: {onLoginClose: () => void}) {
  return (
    <Header>
      <LoginTitle> 스며들다 </LoginTitle>
      <CancelBtn onClick={onLoginClose}> ❌ </CancelBtn>
    </Header>
  );
}

export default LoginHeader;

const Header = styled.div`
  width: 100%;
  height: 10%;
  background-color: rgba(248, 249, 250, .9);
  border-radius: 5px;
`;

const LoginTitle = styled.h2`
  display: inline-block;
  width: 85%;
  height: 100%;
  line-height: 38px;
  margin-left: 15px;
  color: ${({theme}) => theme.color.yellow};
  font-size: 1rem;
  @media ${({ theme }) => theme.device.mobile } {
    width: 85%;
    line-height: 28px;
  }
`;

const CancelBtn = styled.button`
  all: unset;
  width: 10%;
  height: 100%;
  text-align: center;
  font-size: 0.95rem;
  cursor: pointer;
  @media ${({ theme }) => theme.device.mobile } {
    width: 5%;
  }
`;