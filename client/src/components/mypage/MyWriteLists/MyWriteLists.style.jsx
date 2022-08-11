import React from 'react';
import styled from 'styled-components';
import { ListsUl, Listli, Title, ListContent, NotWriteLists } from '../../../styles/mypage/writeList';

const MyWriteWrapper = styled.div`
  width: 70%;
  height: 75%;
  display: flex;
  flex-direction: column;
  justify-content: ${({ writeList }) => !writeList ? "center" : "space-between"};
  align-items: center;
  position: relative;

  @media screen and (max-width: 1180px) {
    width: 70%;
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

const MyWritePageNumber = styled.p`
  font-size: 20px;
`;

function MyWriteListsStyle ({ writeList, onMoveDetail }) {
  return (
    <MyWriteWrapper writeList={writeList}>
      {
        !writeList ?
        <NotWriteLists> 작성한 게시글이 없습니다. </NotWriteLists> :
        <>
          <ListsUl>
            {writeList.map(item => 
              <Listli key={item.createAt} id={item._id} onClick={onMoveDetail} >
                <Title> {item.title.length <= 13 ? item.title : `${item.title.substring(0, 13)}...`} </Title>
                <ListContent dangerouslySetInnerHTML={{ __html: item.content}} />
            </Listli>
            )}
          </ListsUl>
          <MyWritePageNumber> 1 </MyWritePageNumber>
        </>
      }
    </MyWriteWrapper>
  );
}

export default MyWriteListsStyle;