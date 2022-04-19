import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const Lists = styled.ul`
  width: 90%;
  height: 50%;
  margin: 0 auto;
`;

const List = styled.li`
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:first-child {
    margin-top: 10px;
  }
`;

const MyLink = styled(Link)`
  font-size: 20px;
  color: gray;
  font-weight: ${({ current }) => (current ? `bold` : `none`)};
  border-bottom: 2px solid
    ${({ current, theme }) => (current ? `${theme.color.lightGray}` : 'transparent')};
`;

function ProfileLists () {
  const { pathname } = useLocation(null);

  return (
    <Lists>
      <List>
        <MyLink to="/my" current={pathname === '/my'}> 내 정보 수정 </MyLink>
      </List>
      <List>
        <MyLink to="/my/writeLists" current={pathname === '/my/writeLists'}> 작성한 글 목록 </MyLink>
      </List>
      <List>
        <MyLink to="/my/favoriteLists" current={pathname === '/my/favoriteLists'}> 즐겨찾기한 글 목록 </MyLink>
      </List>
    </Lists>
  );
}

export default ProfileLists;