import { memo } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import UserImage from '../../common/atoms/UserImage';
import DownArrow from '../../../asset/icons/icon-down.svg';
import { loginToggle } from '../../../redux/slice/toggleSlice';
import MyPageModal from '../molecules/MyPageModal';

interface DropDownProps {
  isDropdownVisible: boolean;
  dropdownRef: React.RefObject<HTMLElement> | null | undefined;
  handleDropdownShow: () => void;
  handleLogoutClick: (cb?:any) => () => void;
}

function UserLink ({ isDropdownVisible, dropdownRef, handleDropdownShow, handleLogoutClick }: DropDownProps) {
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
        {isDropdownVisible &&
          <MyPageModal
            ref={dropdownRef}
            handleLogoutClick={handleLogoutClick}
            handleDropdownShow={handleDropdownShow}
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