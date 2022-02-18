import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormBox } from './EmailForm';

const SocialFormBox = styled(FormBox)`
  width: 70%;
  height: 20%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  border: none;
  margin: 0 auto;
  border-top: 1px solid rgba(12, 12, 12, .3);
`;

const KaKaoLink = styled(Link)`
  width: 60px;
  height: 60px;
  background-color: ${({theme}) => theme.color.yellow};
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

function SocialForm () {
  return (
    <SocialFormBox>
      <KaKaoLink to="/"> KaKao </KaKaoLink>
      <GoogleLink to="/"> Google </GoogleLink>
    </SocialFormBox>
  );
}

export default SocialForm;