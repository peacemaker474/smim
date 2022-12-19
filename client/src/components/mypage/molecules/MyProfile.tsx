import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

function MyProfile () {
  const { pathname } = useLocation();

  return (
    <MyProfileWrapper>
      <MyProfileLists>
        <ProfileList>
          <MyProfileLink to='/my' current={pathname === '/my'}> 내 정보 수정 </MyProfileLink>
        </ProfileList>
        <ProfileList>
          <MyProfileLink to='/my/changepw' current={pathname === '/my/changepw'}> 비밀번호 변경 </MyProfileLink>
        </ProfileList>
        <ProfileList>
          <MyProfileLink to='/my/writeLists' current={pathname === '/my/writeLists'}> 작성한 글목록 </MyProfileLink>
        </ProfileList>
        <ProfileList>
          <MyProfileLink to='/my/bookMarkLists' current={pathname === '/my/bookMarkLists'}> 즐겨찾기한 글목록 </MyProfileLink>
        </ProfileList>
        <ProfileList>
          <MyProfileLink to='/my/user-delete' current={pathname === '/my/user-delete'}> 회원 탈퇴 </MyProfileLink>
        </ProfileList>
      </MyProfileLists>
    </MyProfileWrapper>
  );
}

export default MyProfile; 

const MyProfileWrapper = styled.div`
  width: 30%;
  height: 85%;
  @media screen and (max-width: 1180px) {
    width: 100%;
    height: 10%;
  }
  @media screen and (max-width: 769px) {
    padding-top: 1.5rem;
  }
`;

const MyProfileLists = styled.ul`
  width: 90%;
  height: 50%;
  @media screen and (max-width: 1180px) {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`;

const ProfileList = styled.li`
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  padding-left: 2.5em;
  @media screen and (max-width: 1180px) {
    padding: 0;
    justify-content: center;
    height: 100%;
    &:nth-child(2) {
      width: 80%;
    }
  }
  @media screen and (max-width: 380px) {
    &:first-child {
      width: 60%;
    }
    &:nth-child(2) {
      width: 80%;
    }
    &:nth-child(3) {
      width: 70%;
    }
  }
`;

const MyProfileLink = styled(Link)<{ current: boolean }>`
  font-size: 1em;
  color: gray;
  font-weight: ${({ current }) => (current ? `bold` : `none`)};
  border-bottom: 2px solid
    ${({ current, theme }) => (current ? `${theme.color.lightGray}` : 'transparent')};
  
  @media screen and (max-width: 500px) {
    font-size: 0.8em;
  }
  @media screen and (max-width: 380px) {
    font-size: 0.65em;
  }
`;