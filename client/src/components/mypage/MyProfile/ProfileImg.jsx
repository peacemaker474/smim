import React from 'react';
import styled from 'styled-components';

const MyImg = styled.img`
  width: 50%;
  height: 70%;
  border-radius: 100%;
  border: 1px solid black; // 추후에 지울것
`;

function ProfileImg () {
  return (
    <MyImg />
  );
}

export default ProfileImg;