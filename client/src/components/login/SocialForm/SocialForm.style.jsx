import React from 'react';
import styled from 'styled-components';
import { FormBox } from '../EmailForm/EmailForm.style';

const SocialFormBox = styled(FormBox)`
  width: 70%;
  height: 20%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  border: none;
  margin: 0 auto;
  border-top: 1px solid rgba(12, 12, 12, 0.3);
`;

const KaKaoLink = styled.a`
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.color.yellow};
  text-align: center;
  line-height: 60px;
  font-size: 20px;
  color: white;
  text-decoration: none;
  border-radius: 10px;
  &:hover {
    text-decoration: underline;
    font-size: 21.5px;
  }
`;

const GoogleLink = styled(KaKaoLink)`
  background-color: white;
  color: black;
  border: 1px solid black;
`;

function SocialFormStyle () {
  return (
    <SocialFormBox>
      <KaKaoLink href='http://localhost:4000/login/kakao'> KaKao </KaKaoLink>
      <GoogleLink href='http://localhost:4000/login/google'>Google</GoogleLink>
    </SocialFormBox>
  );
}

export default SocialFormStyle;