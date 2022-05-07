import React from 'react';
import styled from 'styled-components';
import QuestionItem from './QuestionItem';

const ListContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.color.lightGray};
  border-radius: 14px;
`;
const ListHead = styled.div`
  display: flex;
  padding: 0 15px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.color.lightGray};
  height: 60px;
`;

const MoreBtn = styled.button`
  width: 67px;
  height: 31px;
  padding: 0;
  background-color: ${({ theme }) => theme.color.yellow};
  border-radius: 4px;
  font-weight: 700;
  color: #ffffff;
`;

const ListBody = styled.div``;

export default function QuestionList({ age }) {
  return (
    <ListContainer>
      <ListHead>
        <h2>{age}대에게 질문하세요</h2>
        <MoreBtn>더보기</MoreBtn>
      </ListHead>
      <ListBody>
        <QuestionItem />
        <QuestionItem />
        <QuestionItem />
        <QuestionItem />
        <QuestionItem />
      </ListBody>
    </ListContainer>
  );
}
