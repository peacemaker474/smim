import React, { useState, useEffect } from 'react';
import { getBookMarkLists } from '../../../network/mypage/http';
import { useNavigate } from 'react-router-dom';
import BookMarkListsStyle from './BookMarkLists.style';

function BookMarkLists ({ userId }) {
  const [bookMarkList, setBookMarkList] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getBookMarkLists(userId).then((res) => {
      setBookMarkList(res.favoriteLists)
    })
  }, [userId])

  const handleBookMarkMove = (evt) => {
    const url = evt.currentTarget.id;
    navigate(`/posts/view/${url}`);
  }

  return (
    <BookMarkListsStyle
      bookMarkList={bookMarkList}
      onBookMarkMove={handleBookMarkMove}
    />
  );
}

export default BookMarkLists;