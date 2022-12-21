import React, { lazy, Suspense, useCallback } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getMyWriteLists } from '../../../networks/mypage/http';
import LoadingPage from '../../../pages/LoadingPage';
import { useAppSelector } from '../../../redux/hooks';
import { MyWriteListData } from '../../../type/postTypes';

const MyListsComponents = lazy(() => import('../atoms/MyLists'));

function MyWriteLists () {
  const { id } = useAppSelector((state) => state.user);
  const fetchAPI = () => getMyWriteLists(id);

  const { data } = useQuery<MyWriteListData[] | string>(['MyWriteLists'], fetchAPI);

  const navigate = useNavigate();
  const handleMoveDetail = useCallback((evt: React.MouseEvent<HTMLLIElement>) => {
    const url = evt.currentTarget.id;
    navigate(`/post/view/${url}`);
  }, [navigate]);

  return (
    <Suspense fallback={<LoadingPage position='absolute' top='50%' left='60%'/>}>
      <MyWriteWrapper writeList={typeof(data) === 'string'}>
        <MyListsComponents myWriteLists={data || []} handleMoveDetail={handleMoveDetail}/>
      </MyWriteWrapper>
    </Suspense>
  );
}

export default MyWriteLists;

const MyWriteWrapper = styled.div<{ writeList: boolean }>`
  width: 70%;
  height: 75%;
  display: flex;
  flex-direction: column;
  justify-content: ${({ writeList }) => writeList ? "center" : "space-between"};
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
    width: 90%;
    height: 80%;
  }
  @media screen and (max-width: 769px) {
    width: 95%;
    height: 50%;
  }
  @media screen and (max-height: 796px) {
    height: 80%;
  }
`;