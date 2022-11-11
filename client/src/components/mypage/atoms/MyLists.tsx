import React from 'react';
import { IsImage, ListContent, Listli, ListsUl, NotWriteLists, Title } from '../../../styles/MyPageStyles';
import { MyWriteListData } from '../../../type/postTypes';

interface MyListProps {
  data: MyWriteListData[] | string;
  handleMoveDetail: (evt: React.MouseEvent<HTMLLIElement>) => void;
}

function MyLists ({ data, handleMoveDetail }: MyListProps) {
  return (
      typeof(data) === 'string' ?
      <NotWriteLists> {data} </NotWriteLists> :
      <ListsUl list={data.length}>
        {data.map((item) => 
          <Listli key={item.createAt} id={item._id} onClick={handleMoveDetail} >
            <Title> {item.title.length <= 13 ? item.title : `${item.title.substring(0, 13)}...`} </Title>
            <ListContent dangerouslySetInnerHTML={{ __html: item.content.value}} />
            {item.content.check && <IsImage> 💾 </IsImage>}
          </Listli>
        )}
      </ListsUl>
  );
}

export default MyLists;