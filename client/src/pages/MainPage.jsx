import React from 'react';
import styled from 'styled-components';
import QuestionList from '../components/postMain/QuestionList';

const MainBody = styled.div`
  width: 100%;
  padding: 257px 0;
`;

const MainContainer = styled.div`
  width: 1143px;
  height: 818px;

  margin: 0 auto;
  display: grid;
  gap: 96px;
  grid-template-columns: repeat(3, 317px);
  grid-template-rows: repeat(3, 363px);
`;

export default function MainPage() {
  return (
    <MainBody>
      <MainContainer>
        <QuestionList age='10' />
        <QuestionList age='20' />
        <QuestionList age='30' />
        <QuestionList age='40' />
        <QuestionList age='50' />
        <QuestionList age='60' />
      </MainContainer>
    </MainBody>
  );
}
