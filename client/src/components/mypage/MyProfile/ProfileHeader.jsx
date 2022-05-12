import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`;

const WelcomeH2 = styled.h2`
  font-size: 18px;
`;

const MyWriteList = styled.span``;

function ProfileHeader () {
  const user = useSelector((state) => state.loginReducer);

  return (
    <Wrapper>
      <WelcomeH2> 안녕하세요 {user.name}님 환영합니다. </WelcomeH2>
      <MyWriteList> 작성한 글 2개 </MyWriteList>
    </Wrapper>
  );
}

export default ProfileHeader;