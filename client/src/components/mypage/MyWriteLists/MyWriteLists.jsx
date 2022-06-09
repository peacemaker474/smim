import React, { useState, useEffect } from 'react';
import { getMyWriteLists } from '../../../network/mypage/http';
import { useNavigate } from 'react-router-dom';
import MyWriteListsStyle from './MyWriteLists.style';

function MyWriteLists ({userId}) {
  const [writeList, setWriteList] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getMyWriteLists(userId).then((res) => {
      setWriteList(res.writeLists);
    })
  }, [userId]);

  const handleMoveDetail = (evt) => {
    const url = evt.currentTarget.id;
    navigate(`/posts/view/${url}`);
  }


  return (
    <MyWriteListsStyle
      writeList={writeList}
      onMoveDetail={handleMoveDetail}
    />
  );
}

export default MyWriteLists;