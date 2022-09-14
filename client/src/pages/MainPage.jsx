import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Cookies } from 'react-cookie';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import MainLists from '../components/postmain/MainLists/MainLists';
import LoadingPage from './LoadingPage';
import { getMainPostLists } from '../network/main/http';

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

function MainPage() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const entryCheck = cookies.get('entry');

  useEffect(() => {
    if (!entryCheck) {
      navigate('/intro');
    }
  }, [entryCheck, navigate]);

  const { isLoading, data, isFetching } = useQuery(['mainLists'], getMainPostLists);

  if (isLoading || isFetching) {
    return <LoadingPage />;
  }

  const handlePostDetailMove = (evt) => {
    const postId = evt.currentTarget.id;
    navigate(`post/view/${postId}`);
  };

  return (
    <MainBody>
      <MainContainer>
        <MainWrapper>
          <MainLists age='10' posts={data?.lists['10']} onPostDetailMove={handlePostDetailMove} />
          <MainLists age='20' posts={data?.lists['20']} onPostDetailMove={handlePostDetailMove} />
          <MainLists age='30' posts={data?.lists['30']} onPostDetailMove={handlePostDetailMove} />
        </MainWrapper>
        <MainWrapper>
          <MainLists age='40' posts={data?.lists['40']} onPostDetailMove={handlePostDetailMove} />
          <MainLists age='50' posts={data?.lists['50']} onPostDetailMove={handlePostDetailMove} />
        </MainWrapper>
      </MainContainer>
    </MainBody>
  );
}

export default MainPage;
