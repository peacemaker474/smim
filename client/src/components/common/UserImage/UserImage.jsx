import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const MyImg = styled.img`
  width: 60%;
  height: 50%;
  border-radius: 100%;
  border: 1px solid black; // 추후에 지울것
`;

function UserImage ({encodeImg}) {
  const user = useSelector((state) => state.user);
  const encoded = encodeURI(user.imgUrl);
  const decoded = decodeURI(encoded);
  
  return (
    <MyImg src={encodeImg !== "" ? encodeImg : "http://localhost:4000/" + decoded}/>
  );
}

export default UserImage;
