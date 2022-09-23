import React, { useCallback } from 'react';
import { useQuery } from 'react-query';
import { getMyWriteLists } from '../../../network/mypage/http';
import { useNavigate } from 'react-router-dom';
import MyWriteListsStyle from './MyWriteLists.style';
import LoadingPage from '../../../pages/LoadingPage';

function MyWriteLists({ userId }) {
  const fetchAPI = () => {
    return getMyWriteLists(userId);
  };

  const { isLoading, isFetching, data } = useQuery(
    ['MyWriteList'],
    fetchAPI,
  );

  const navigate = useNavigate();

  const handleMoveDetail = useCallback((evt) => {
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
    <MyWriteListsStyle 
      writeList={data}
      onMoveDetail={handleMoveDetail}
    />
  );
}

export default MyWriteLists;
