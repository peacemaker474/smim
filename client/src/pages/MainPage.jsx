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
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  @media screen and (max-width: 1180px) {
    width: 430px;
    height: 1400px;
    padding: 75rem 0;
  }
`;

const MainWrapper = styled.div`
  width: 1143px;
  height: 400px;
  display: flex;
  justify-content: space-around;

  @media screen and (max-width: 1180px) {
    width: 430px;
    height: 1400px;
    flex-direction: column;
    margin: 0 auto;
    gap: 50px;
  }
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

  return (
    <MainBody>
      <MainContainer>
        <MainWrapper>
          <MainLists age='10' posts={data?.lists['10']} />
          <MainLists age='20' posts={data?.lists['20']} />
          <MainLists age='30' posts={data?.lists['30']} />
        </MainWrapper>
        <MainWrapper>
          <MainLists age='40' posts={data?.lists['40']} />
          <MainLists age='50' posts={data?.lists['50']} />
        </MainWrapper>
      </MainContainer>
    </MainBody>
  );
}

export default MainPage;
