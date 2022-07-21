import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import MainLists from '../components/postmain/MainLists/MainLists';
import LoadingPage from './LoadingPage';
import { getMainPostLists } from '../network/main/http';

const MainBody = styled.main`
  width: 100%;
  padding: 13em 0;
`;

const MainContainer = styled.div`
  width: 1143px;
  height: 818px;  
  margin: 0 auto;
  display: grid;
  gap: 96px;
  grid-template-columns: repeat(3, 317px);
  grid-template-rows: repeat(2, 363px);
`;

function MainPage() {
  const { isLoading, data, isFetching } = useQuery(
    ['mainLists'],
    getMainPostLists,
    {
      staleTime: 60 * 1000,
    }
  );

  if (isLoading || isFetching) {
    return <LoadingPage />
  }

  console.log(data);

  return (
    <MainBody>
      <MainContainer>
        <MainLists age='10' posts={data?.lists['10']} />
        <MainLists age='20' posts={data?.lists['20']} />
        <MainLists age='30' posts={data?.lists['30']} />
        <MainLists age='40' posts={data?.lists['40']} />
        <MainLists age='50' posts={data?.lists['50']} />
      </MainContainer>
    </MainBody>
  );
}

export default MainPage;
