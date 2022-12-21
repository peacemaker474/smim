import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '../../../redux/hooks';
import { loginToggle } from '../../../redux/slice/toggleSlice';
import Span from './Span';

function SignupLink () {
  const dispatch = useAppDispatch();

  const handleLoginClick = () => {
    dispatch(loginToggle());
  }

  return (
    <SignBox>
      <Span fontSize='0.8rem'> 아직 회원이 아니신가요? </Span>
      <SignLink to='/signup' onClick={handleLoginClick}> 회원가입 </SignLink>
    </SignBox>
  );
}

export default SignupLink;

const SignBox = styled.div`
  span {
    color: ${({theme}) => theme.color.gray};
  }

  @media ${({ theme }) => theme.device.mobile } {
    span {
      font-size: 0.7rem;
    }
  }
`;

const SignLink = styled(Link)`
  font-size: 0.9rem;
  color: ${({theme}) => theme.color.black};
  font-weight: bold;
  @media ${({ theme }) => theme.device.mobile } {
    font-size: 0.8rem;
  }
`;