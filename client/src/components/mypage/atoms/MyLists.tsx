import React from 'react';
import { IsImage, ListContent, Listli, ListsUl, NotWriteLists, Title } from '../../../styles/MyPageStyles';
import { MyWriteListData } from '../../../type/postTypes';

interface MyListProps {
  myWriteLists: MyWriteListData[] | string;
  handleMoveDetail: (evt: React.MouseEvent<HTMLLIElement>) => void;
}

function MyLists ({ myWriteLists, handleMoveDetail }: MyListProps) {
  return (
      typeof(myWriteLists) === 'string' ?
      <NotWriteLists> {myWriteLists} </NotWriteLists> :
      <ListsUl list={myWriteLists.length}>
        {myWriteLists.map((item) => 
          <Listli key={item._id} id={item._id} onClick={handleMoveDetail} >
            <Title> {item.title.length <= 13 ? item.title : `${item.title.substring(0, 13)}...`} </Title>
            <ListContent dangerouslySetInnerHTML={{ __html: item.content.value}} />
            {item.content.check && <IsImage> 💾 </IsImage>}
          </Listli>
        )}
      </ListsUl>
  );
}

export default MyLists;