import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import MainLists from '../components/postmain/MainLists/MainLists';
import LoadingPage from './LoadingPage';
import { getMainPostLists } from '../network/main/http';
import { useNavigate } from 'react-router-dom';

const MainBody = styled.main`
  width: 100%;
  padding: 13em 0;

  @media ${({ theme }) => theme.device.webMiddle} {
    padding: 0;
  }

  @media ${({ theme }) => theme.device.ipad} {
    padding: 13em 0;
  }
`;

const MainContainer = styled.div`
  width: 1143px;
  height: 818px;  
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  @media ${({ theme }) => theme.device.webMiddle} {
    width: 850px;
    height: 1223px;
  }

  @media ${({ theme }) => theme.device.ipad} {
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

  @media ${({ theme }) => theme.device.webMiddle} {
    width: 100%;
    height: 30%;
  }

  @media ${({ theme }) => theme.device.ipad} {
    width: 430px;
    height: 1400px;
    flex-direction: column;
    margin: 0 auto;
    gap: 50px;
  }
`;

function MainPage() {
  const navigate = useNavigate();
  const { isLoading, data, isFetching } = useQuery(
    ['mainLists'],
    getMainPostLists,
  );

  if (isLoading || isFetching) {
    return <LoadingPage />
  }

  const handlePostListsMove = (evt) => {
    const id = evt.target.previousSibling.id;
    navigate(`generation?age=${id}`);
  };

  const handlePostDetailMove = (evt) => {
    const postId = evt.currentTarget.id;
    navigate(`post/view/${postId}`);
  }

  return (
    <MainBody>
      <MainContainer>
        <MainWrapper>
          <MainLists 
            age='10'
            posts={data?.lists['10']}
            onPostListsMove={handlePostListsMove}
            onPostDetailMove={handlePostDetailMove}
          />
          <MainLists
            age='20'
            posts={data?.lists['20']}
            onPostListsMove={handlePostListsMove}
            onPostDetailMove={handlePostDetailMove}
          />
          <MainLists
            age='30'
            posts={data?.lists['30']}
            onPostListsMove={handlePostListsMove}
            onPostDetailMove={handlePostDetailMove}
          />
        </MainWrapper>
        <MainWrapper>
          <MainLists
            age='40'
            posts={data?.lists['40']}
            onPostListsMove={handlePostListsMove}
            onPostDetailMove={handlePostDetailMove}
          />
          <MainLists
            age='50'
            posts={data?.lists['50']}
            onPostListsMove={handlePostListsMove}
            onPostDetailMove={handlePostDetailMove}
          />
        </MainWrapper>
      </MainContainer>
    </MainBody>
  );
}

export default MainPage;
