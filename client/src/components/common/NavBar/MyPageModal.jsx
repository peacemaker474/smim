import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MyPageModalWrraper = styled.div`
  width: 100px;
  height: 70px;
  background-color: white;
  position: absolute;
  top: 90%;
  left: 86%;
  box-shadow: 0 5px 25px rgb(0 0 0 / 15%);
  border-radius: 5px;
`;

const MyPageModalLists = styled.ul`
  width: 100%;
  height: 100%;
`;

const MyPageModalList = styled.li`
  padding: 0.7em 0;
  text-align: center;
  font-size: 0.9em;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: rgba(127, 127, 127, .1);
  }
`;

const MyPageLink = styled(Link)`
`;


function MyPageModal ({ onMyPageClick, onLogoutClick }) {
  return (
    <MyPageModalWrraper>
      <MyPageModalLists>
        <MyPageModalList>
          <MyPageLink to="/my" onClick={onMyPageClick}> 마이페이지 </MyPageLink>
        </MyPageModalList>
        <MyPageModalList onClick={onLogoutClick}>
          로그아웃
        </MyPageModalList>
      </MyPageModalLists>
    </MyPageModalWrraper>
  );
}

export default React.memo(MyPageModal);