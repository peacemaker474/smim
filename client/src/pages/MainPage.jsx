import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import QuestionList from '../components/postmain/QuestionList/QuestionList';
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

export default function MainPage() {
  const [postLists, setPostLists] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getMainPostLists()
      .then((res) => {
        if (res.data.success) {
          setPostLists(res.data.lists);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
    });
  }, []);
  return (
      loading ? 
        <LoadingPage />
        :
        <MainBody>
          <MainContainer>
            <QuestionList age='10' post={postLists && postLists['10']} />
            <QuestionList age='20' post={postLists && postLists['20']} />
            <QuestionList age='30' post={postLists && postLists['30']} />
            <QuestionList age='40' post={postLists && postLists['40']} />
            <QuestionList age='50' post={postLists && postLists['50']} />
            <QuestionList age='60' post={postLists && postLists['60']} />
          </MainContainer>
        </MainBody>
  );
}
