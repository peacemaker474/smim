import React from 'react';
import styled from 'styled-components';
import { ListsUl, Listli, Title, ListContent, NotWriteLists, IsImage } from '../../../styles/mypage/writeList';

const MyWriteWrapper = styled.div`
  width: 70%;
  height: 75%;
  display: flex;
  flex-direction: column;
  justify-content: ${({ writeList }) => !writeList ? "center" : "space-between"};
  align-items: center;
  position: relative;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    height: 17%;
    background-color: rgba(127, 127, 127, .5);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0,0,0,0);
  }

  @media screen and (max-width: 1180px) {
    width: 90%;
    height: 80%;
  }

  @media screen and (max-width: 769px) {
    width: 90%;
    height: 50%;
  }

  @media screen and (max-height: 796px) {
    height: 80%;
  }
`;

function MyWriteListsStyle ({ writeList, onMoveDetail }) {
  return (
    <MyWriteWrapper writeList={typeof(writeList) === 'string' ? 0 : 1}>
      {
        typeof(writeList) === 'string' ?
        <NotWriteLists> {writeList} </NotWriteLists> :
        <ListsUl list={writeList.length}>
          {writeList.map(item => 
            <Listli key={item.createAt} id={item._id} onClick={onMoveDetail} >
              <Title> {item.title.length <= 13 ? item.title : `${item.title.substring(0, 13)}...`} </Title>
              <ListContent dangerouslySetInnerHTML={{ __html: item.content.value}} />
              {item.content.check && <IsImage> 💾  </IsImage>}
            </Listli>
          )}
        </ListsUl>
      }
    </MyWriteWrapper>
  );
}

export default MyWriteListsStyle;