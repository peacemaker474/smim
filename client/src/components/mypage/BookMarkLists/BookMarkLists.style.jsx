import React from 'react';
import styled from 'styled-components';
import { ListsUl, Listli, Title, ListContent, Writer, NotWriteLists } from '../../../styles/mypage/writeList';

const BookMarkWrapper = styled.div`
  width: 70%;
  height: 75%;
  display: flex;
  flex-direction: column;
  justify-content: ${({ bookMarkList }) => !bookMarkList ? "center" : "space-between"};
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

const BookMarkPageNumber = styled.p`
  font-size: 20px;
`;

function BookMarkListsStyle ({ bookMarkList, onBookMarkMove}) {
  return (
    <BookMarkWrapper bookMarkList={bookMarkList}>
      {
        !bookMarkList ?
          <NotWriteLists> 즐겨찾기한 게시글이 없습니다. </NotWriteLists> :
          <>
            <ListsUl>
              {bookMarkList.map(item => 
                <Listli key={item.createAt} id={item._id} onClick={onBookMarkMove}>
                  <Title> {item.title} </Title>
                  <ListContent dangerouslySetInnerHTML={{__html: item.content}} />
                  <Writer> {item.owner.nickname} </Writer>
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