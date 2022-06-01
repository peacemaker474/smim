import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ListsUl, Listli, Title, ListContent, Writer } from '../../../styles/mypage/writeList';
import { getBookMarkLists } from '../../../network/mypage/http';
import { useNavigate } from 'react-router-dom';

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

function FavoriteLists ({ userId }) {
  const [favoriteList, setFavoriteList] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getBookMarkLists(userId).then((res) => {
      setFavoriteList(res.favoriteLists)
    })
  }, [userId])

  const handleBookMarkMove = (evt) => {
    const url = evt.currentTarget.id;
    navigate(`/posts/view/${url}`);
  }

  return (
    <Wrapper>
      <ListsUl>
        {favoriteList && favoriteList.map(item => 
          <Listli key={item.createAt} id={item._id} onClick={handleBookMarkMove}>
            <Title> {item.title} </Title>
            <ListContent> {item.content} </ListContent>
            <Writer> {item.owner} </Writer>
        </Listli>
        )}
      </ListsUl>
      <WritePage> 1 </WritePage>
    </Wrapper>
  );
}

export default FavoriteLists;