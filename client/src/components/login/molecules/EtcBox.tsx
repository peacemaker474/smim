import styled from 'styled-components';
import SignupLink from '../atoms/SignupLink';
import Span from '../atoms/Span';

const Wrapper = styled.div`
  width: 90%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 0 auto;

  @media ${({ theme }) => theme.device.mobile } {
    span {
      font-size: 0.5rem;
    }
  }
`;

function EtcBox () {
  return (
    <Wrapper>
      <Span fontSize='0.7rem'> 혹시 아이디와 비밀번호를 잊어버리셨나요? </Span>
      <SignupLink />
    </Wrapper>
  );
}

export default EtcBox;