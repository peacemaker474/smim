import React from 'react';
import styled from 'styled-components';
import { ListsUl, Listli, Title, ListContent, Writer, NotWriteLists, IsImage } from '../../../styles/mypage/writeList';

const BookMarkWrapper = styled.div`
  width: 70%;
  height: 75%;
  display: flex;
  flex-direction: column;
  justify-content: ${({ bookMarkList }) => !bookMarkList ? "center" : "space-between"};
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

const FooterBox = styled.div`
  width: 100%;
  height: 17%;
  display: flex;
  justify-content: ${({ current }) => current ? "space-between" : "flex-end"};
  align-items: center;
`;

function BookMarkListsStyle ({ bookMarkList, onBookMarkMove}) {
  return (
    <BookMarkWrapper bookMarkList={typeof(bookMarkList) === 'string' ? 0 : 1}>
      {
        typeof(bookMarkList) === 'string' ?
          <NotWriteLists> {bookMarkList} </NotWriteLists> :
          <ListsUl list={bookMarkList.length}>
            {bookMarkList.map(item => 
              <Listli key={item.createAt} id={item._id} onClick={onBookMarkMove}>
                <Title> {item.title.length <= 13 ? item.title : `${item.title.substring(0, 13)}...`} </Title>
                <ListContent dangerouslySetInnerHTML={{__html: item.content.value}} />
                <FooterBox current={item.content.check}>
                  {item.content.check && <IsImage> 💾 </IsImage>}
                  <Writer> {item.owner.nickname} </Writer>
                </FooterBox>
              </Listli>
            )}
          </ListsUl>
      }
    </BookMarkWrapper>
  );
}

export default BookMarkListsStyle;