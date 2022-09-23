import React, { useCallback } from 'react';
import { useQuery } from 'react-query';
import { getBookMarkLists } from '../../../network/mypage/http';
import { useNavigate } from 'react-router-dom';
import BookMarkListsStyle from './BookMarkLists.style';
import LoadingPage from '../../../pages/LoadingPage';

function BookMarkLists({ userId }) {
  const fetchAPI = () => {
    return getBookMarkLists(userId)
  };

  const { isLoading, isFetching, data } = useQuery(
    ['BookMarkLists'],
    fetchAPI,
  );

  const navigate = useNavigate();

  const handleBookMarkMove = useCallback((evt) => {
    const url = evt.currentTarget.id;
    navigate(`/post/view/${url}`);
  }, [navigate]);

  if (isLoading || isFetching) {
    return (
      <LoadingPage 
        position={"absolute"} 
        top={"50%"} 
        left={"60%"}
      />
    );
  }

  return (
    <BookMarkListsStyle 
      bookMarkList={data}
      onBookMarkMove={handleBookMarkMove}
    />
  );
}

export default BookMarkLists;
