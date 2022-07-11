import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import MainLists from '../components/postmain/MainLists/MainLists';
import LoadingPage from './LoadingPage';
import { getMainPostLists } from '../network/main/http';

const MainBody = styled.div`
  width: 100%;
  padding: 257px 0;
`;

const MainContainer = styled.div`
  width: 1143px;
  height: 818px;

  margin: 0 auto;
  display: grid;
  gap: 96px;
  grid-template-columns: repeat(3, 317px);
  grid-template-rows: repeat(3, 363px);
`;

function MainPage() {
  const { isLoading, data } = useQuery(
    ['mainLists'],
    getMainPostLists,
    {
      staleTime: 60 * 1000,
    }
  );

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <MainBody>
      <MainContainer>
        <MainLists age='10' posts={data?.lists['10']} />
        <MainLists age='20' posts={data?.lists['20']} />
        <MainLists age='30' posts={data?.lists['30']} />
        <MainLists age='40' posts={data?.lists['40']} />
        <MainLists age='50' posts={data?.lists['50']} />
        <MainLists age='60' posts={data?.lists['60']} />
      </MainContainer>
    </MainBody>
  );
}

export default MainPage;
