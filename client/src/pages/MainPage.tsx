import { lazy, Suspense, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getMainPostLists } from '../networks/main/http';
import { MainPageData } from '../types';

const MainListsComponent = lazy(() => import('../components/main/molecules/MainLists'));

function MainPage () {
  // const navigate = useNavigate();
  // const cookies = new Cookies();
  // const entryCheck = cookies.get('entry');

  // useEffect(() => {
  //   if (!entryCheck) {
  //     navigate('/intro');
  //   }
  // }, [entryCheck, navigate])

  const { data } = useQuery<MainPageData>(['mainLists'], getMainPostLists);

  return (
    <MainBody>
      <MainContainer>
        <Suspense fallback={<div>Loading...</div>}>
          <MainWrapper>
            <MainListsComponent age='10' posts={data?.lists['10'] || []} />
            <MainListsComponent age='20' posts={data?.lists['20'] || []} />
            <MainListsComponent age='30' posts={data?.lists['30'] || []} />
          </MainWrapper>
          <MainWrapper>
            <MainListsComponent age='40' posts={data?.lists['40'] || []} />
            <MainListsComponent age='50' posts={data?.lists['50'] || []} />
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