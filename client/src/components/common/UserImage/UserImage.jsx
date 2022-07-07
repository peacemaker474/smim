import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const MyImg = styled.img`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 100%;
  border: 1px solid black; // 추후에 지울것
`;

function UserImage ({width, height, encodeImg}) {
  const user = useSelector((state) => state.user);
  const encoded = encodeURI(user.imgUrl);
  const decoded = decodeURI(encoded);

  console.log(encodeImg);
  
  return (
    <MyImg 
      src={encodeImg ? encodeImg : "http://localhost:4000/" + decoded}
      width={width}
      height={height}
    />
  );
}

export default UserImage;
