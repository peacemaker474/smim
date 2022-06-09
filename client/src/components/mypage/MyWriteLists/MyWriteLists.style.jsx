import React from 'react';
import styled from 'styled-components';
import { ListsUl, Listli, Title, ListContent } from '../../../styles/mypage/writeList';

const MyWriteWrapper = styled.div`
  width: 50vw;
  height: 60vh;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const MyWritePageNumber = styled.p`
  font-size: 20px;
`;

function MyWriteListsStyle ({ writeList, onMoveDetail }) {
  return (
    <MyWriteWrapper>
      <ListsUl>
        {writeList && writeList.map(item => 
          <Listli key={item.createAt} id={item._id} onClick={onMoveDetail}>
            <Title> {item.title} </Title>
            <ListContent> {item.content} </ListContent>
        </Listli>
        )}
      </ListsUl>
      <MyWritePageNumber> 1 </MyWritePageNumber>
    </MyWriteWrapper>
  );
}

export default MyWriteListsStyle;