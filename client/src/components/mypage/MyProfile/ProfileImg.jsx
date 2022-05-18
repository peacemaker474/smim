import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const MyImg = styled.img`
  width: 60%;
  height: 50%;
  border-radius: 100%;
  border: 1px solid black; // 추후에 지울것
`;

function ProfileImg () {
  const user = useSelector((state) => state.loginReducer);
  console.log(user);
  return (
    <MyImg src={"/" + user.imgUrl}/>
  );
}

export default ProfileImg;