import { memo } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import UserImage from './UserImage';
import DownArrow from '../../../asset/icons/icon-down.svg';
import { loginToggle, menuToggle } from '../../../redux/slice/toggleSlice';
import MyPageModal from '../molecules/MyPageModal';
import { getUserLogOut } from '../../../redux/services/UserService';
import { DELETE_TOKEN } from '../../../redux/slice/authSlice';

interface DropDownProps {
  isDropdownVisible: boolean;
  dropdownRef: React.RefObject<HTMLElement> | null | undefined;
  handleDropdownShow: () => void;
}

function UserLink ({ isDropdownVisible, dropdownRef, handleDropdownShow }: DropDownProps) {
  const { authenticated } = useAppSelector((state) => state.auth);
  const { imgUrl } = useAppSelector((state) => state.user);
  const { menuToggled } = useAppSelector((state) => state.toggle);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    dispatch(loginToggle());
  }

  const handleLogoutClick = () => {
    dispatch(getUserLogOut());
    dispatch(DELETE_TOKEN());
    handleDropdownShow();
    if (menuToggled) dispatch(menuToggle());

    navigate('/');
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
        {isDropdownVisible &&
          <MyPageModal
            ref={dropdownRef}
            handleLogoutClick={handleLogoutClick}
          />
        }
      </>
}

export default memo(UserLink);

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