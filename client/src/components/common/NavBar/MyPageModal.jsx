import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MyPageModalWrraper = styled.div`
  width: 100px;
  height: 80px;
  background-color: white;
  position: absolute;
  top: 90%;
  left: 82%;
  box-shadow: 0 5px 25px rgb(0 0 0 / 15%);
  border-radius: 5px;
`;

const MyPageModalLists = styled.ul`
  width: 100%;
  height: 100%;
`;

const MyPageModalList = styled.li`
  width: 100%;
  height: 50%;
  text-align: center;
  line-height: 40px;
  font-size: 0.9em;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: rgba(127, 127, 127, .1);
  }
`;

const MyPageLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
`;

const MyPageModal = (({ onMyPageClick, onLogoutClick }, ref) => {
  return (
    <MyPageModalWrraper ref={ref}>
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
});

const forwardedRefMyPageModal = React.forwardRef(MyPageModal);
export default React.memo(forwardedRefMyPageModal);