import React from 'react';
import styled from 'styled-components';

const MyImg = styled.img`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 100%;
  object-fit: contain;
  background-color: white;
  border: 1px solid rgba(7, 7, 7, .6); // 추후에 지울것
`;

function UserImage ({width, height, encodeImg, imgUrl}) {
  const encoded = encodeURI(imgUrl);
  const decoded = decodeURI(encoded);
  
  return (
    <MyImg 
      src={encodeImg ? encodeImg : "http://localhost:4000/" + decoded}
      alt="user_profileImage"
      width={width}
      height={height}
    />
  );
}

export default React.memo(UserImage);
