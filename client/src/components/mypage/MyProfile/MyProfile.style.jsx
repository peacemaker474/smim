import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MyProfileWrapper = styled.div`
  width: 25%;
  height: 75%;
`;

const MyProfileLists = styled.ul`
  width: 90%;
  height: 50%;
`;

const ProfileList = styled.li`
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  padding-left: 3em;
`;

const MyProfileLink = styled(Link)`
  font-size: 1.2em;
  color: gray;
  font-weight: ${({ current }) => (current ? `bold` : `none`)};
  border-bottom: 2px solid
    ${({ current, theme }) => (current ? `${theme.color.lightGray}` : 'transparent')};
`;

function MyProfileStyle ({ social, pathname }) {
  return (
    <MyProfileWrapper>
      <MyProfileLists>
        {!social && 
          <>
            <ProfileList>
              <MyProfileLink to="/my" current={pathname === '/my'}> 내 정보 수정 </MyProfileLink>
            </ProfileList>
            <ProfileList>
              <MyProfileLink to="/my/changepw" current={pathname === '/my/changepw'}> 비밀번호 변경 </MyProfileLink>
            </ProfileList>
          </>
        }
        <ProfileList>
          <MyProfileLink to="/my/writeLists" current={pathname === '/my/writeLists'}> 작성한 글 목록 </MyProfileLink>
        </ProfileList>
        <ProfileList>
          <MyProfileLink to="/my/favoriteLists" current={pathname === '/my/favoriteLists'}> 즐겨찾기한 글 목록 </MyProfileLink>
        </ProfileList>
      </MyProfileLists>
    </MyProfileWrapper>
  );
}

export default MyProfileStyle;