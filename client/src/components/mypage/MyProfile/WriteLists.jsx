import React from 'react';
import styled from 'styled-components';
import { test } from './test';
import { ListsUl, Listli, Title, ListContent, Writer } from '../../../styles/mypage/writeList';

const Wrapper = styled.div`
  width: 50vw;
  height: 60vh;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const WritePage = styled.p`
  font-size: 20px;
`;

function WriteLists () {
  return (
    <Wrapper>
      <ListsUl>
        {test.map(item => 
          <Listli key={item.id}>
            <Title> {item.title} </Title>
            <ListContent> {item.content} </ListContent>
            <Writer> {item.writer} </Writer>
        </Listli>
        )}
      </ListsUl>
      <WritePage> 1 </WritePage>
    </Wrapper>
  );
}

export default WriteLists;