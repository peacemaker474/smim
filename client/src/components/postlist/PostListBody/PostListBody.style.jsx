import React from 'react';
import styled from 'styled-components';
import PostListItem from '../PostListItem/PostListItem';
import LoadingPage from '../../../pages/LoadingPage';

export default function PostListBodyPresenter({ postData, obsRef, isLoading }) {
  return (
    <PostListBodyContainer>
      {isLoading && <LoadingPage position='relative' />}
      <PostListBodyLayout>
        {postData ? (
          <>
            {postData.pages.map((item) => {
              return item.data.map((v) => <PostListItem key={v.id} postData={v} />);
            })}
          </>
        ) : null}
        <div ref={obsRef}></div>
      </PostListBodyLayout>
    </PostListBodyContainer>
  );
}

const PostListBodyContainer = styled.div`
  margin-top: 67px;
`;

const PostListBodyLayout = styled.div`
  display: grid;
  grid-template-columns: 234px 234px 234px;
  gap: 20px 14px;

  position: relative;
  // height: 250px;
  @media screen and (max-width: 588px) {
    grid-template-columns: 252px;
    margin-top: 35px;
  }
  @media (min-width: 588px) and (max-width: 850px) {
    grid-template-columns: 234px 234px;
  }
`;
