import React, { lazy, Suspense, useCallback } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getMainPostLists } from '../networks/main/http';
import { AxiosResponseMainPage } from '../type/postTypes';
import LoadingPage from './LoadingPage';

const MainListsComponent = lazy(() => import('../components/main/molecules/MainLists'));

function MainPage () {
  const navigate = useNavigate();

  const { data } = useQuery<AxiosResponseMainPage>(['mainLists'], getMainPostLists);

  const handleMovePostDetail = useCallback((evt: React.MouseEvent<HTMLLIElement>) => {
    const postId = evt.currentTarget.id;
    navigate(`post/view/${postId}`);
  }, [navigate]);  

  return (
    <MainBody>
      <MainContainer>
        <Suspense fallback={<LoadingPage />}>
          <MainWrapper>
            <MainListsComponent
              age='10'
              posts={data?.lists['10'] || []}
              handleMovePostDetail={handleMovePostDetail}
            />
            <MainListsComponent
              age='20'
              posts={data?.lists['20'] || []}
              handleMovePostDetail={handleMovePostDetail}
            />
            <MainListsComponent
              age='30'
              posts={data?.lists['30'] || []}
              handleMovePostDetail={handleMovePostDetail}
            />
          </MainWrapper>
          <MainWrapper>
            <MainListsComponent
              age='40'
              posts={data?.lists['40'] || []}
              handleMovePostDetail={handleMovePostDetail}
            />
            <MainListsComponent
              age='50'
              posts={data?.lists['50'] || []}
              handleMovePostDetail={handleMovePostDetail}
            />
          </MainWrapper>
        </Suspense>
      </MainContainer>
    </MainBody>
  );
}

export default MainPage;

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
  @media ${({ theme }) => theme.device.mobileMiddle} {
    width: 90%;
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
  @media ${({ theme }) => theme.device.mobileMiddle} {
    width: 90%;
  }
`;