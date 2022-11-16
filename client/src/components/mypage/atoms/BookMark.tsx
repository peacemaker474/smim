import React from 'react';
import styled from 'styled-components';
import { IsImage, ListContent, Listli, ListsUl, NotWriteLists, Title, Writer } from '../../../styles/MyPageStyles';
import { BookMarkListData } from '../../../type/postTypes';

interface BookMarkProps {
  bookMarkList: BookMarkListData[] | string;
  handleBookMarkMove: (evt: React.MouseEvent<HTMLLIElement>) => void;
}

function BookMark ({ bookMarkList, handleBookMarkMove }: BookMarkProps) {
  return (
    typeof(bookMarkList) === 'string' ?
    <NotWriteLists> {bookMarkList} </NotWriteLists> :
    <ListsUl list={bookMarkList.length}>
      {bookMarkList.map(item => 
        <Listli key={item._id} id={item._id} onClick={handleBookMarkMove}>
          <Title> {item.title.length <= 13 ? item.title : `${item.title.substring(0, 13)}...`} </Title>
          <ListContent dangerouslySetInnerHTML={{__html: item.content.value}} />
          <FooterBox current={item.content.check}>
            {item.content.check && <IsImage> 💾 </IsImage>}
            <Writer> {item.owner.nickname} </Writer>
          </FooterBox>
        </Listli>
      )}
    </ListsUl>
  )
}

export default BookMark;

const FooterBox = styled.div<{ current: boolean; }>`
width: 100%;
height: 17%;
display: flex;
justify-content: ${({ current }) => current ? "space-between" : "flex-end"};
align-items: center;
`