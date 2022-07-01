import React from 'react';
import styled from 'styled-components';
import { ListsUl, Listli, Title, ListContent, Writer, NotWriteLists } from '../../../styles/mypage/writeList';

const BookMarkWrapper = styled.div`
  width: 50vw;
  height: 60vh;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const BookMarkPageNumber = styled.p`
  font-size: 20px;
`;

function BookMarkListsStyle ({ bookMarkList, onBookMarkMove}) {
  return (
    <BookMarkWrapper>
      {
        bookMarkList === undefined ?
          <NotWriteLists> 즐겨찾기한 게시글이 없습니다.</NotWriteLists> :
          <>
            <ListsUl>
              {bookMarkList.map(item => 
                <Listli key={item.createAt} id={item._id} onClick={onBookMarkMove}>
                  <Title> {item.title} </Title>
                  <ListContent dangerouslySetInnerHTML={{__html: item.content}} />
                  <Writer> {item.owner} </Writer>
              </Listli>
              )}
            </ListsUl>
            <BookMarkPageNumber> 1 </BookMarkPageNumber>
          </>
      }
    </BookMarkWrapper>
  );
}

export default BookMarkListsStyle;