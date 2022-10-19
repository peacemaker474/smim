import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import UserImage from './UserImage';
import DownArrow from '../../../assets/icon/icon-down.svg';
import { loginToggle } from '../../../redux/slice/toggleSlice';

function UserLink () {
  const { authenticated } = useAppSelector((state) => state.auth);
  const { imgUrl } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLoginClick = () => {
    dispatch(loginToggle());
  }

  return !authenticated
    ? <LoginLink onClick={handleLoginClick}> 로그인 </LoginLink> :
      <>
        <UserImage
          width='40px'
          height='40px'
          imgUrl={imgUrl}
        />
        <DownButton />
      </>
}

export default UserLink;

const LoginLink = styled.span`
  font-size: 1.1rem;
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