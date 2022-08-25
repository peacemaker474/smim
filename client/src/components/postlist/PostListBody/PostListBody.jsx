import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { getPostListRead } from '../../../network/post/http';
import LoadingPage from '../../../pages/LoadingPage';
import PostListBodyPresenter from './PostListBody.style';

export default function PostListBody({ setPostArray, postArray, age }) {
  const { accessToken } = useSelector((state) => state.authToken);
  const { key } = useLocation();

  const loadedPostListData = async ({ queryKey }) => {
    const [{ age }] = queryKey;
    try {
      const response = await getPostListRead(age, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setPostArray(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const { isLoading, isFetching, refetch } = useQuery([('postArray', { age })], loadedPostListData);

  useEffect(() => {
    refetch();
  }, [key, refetch]);

  if (isLoading || isFetching) {
    return <LoadingPage position='absolute' />;
  }

  return <PostListBodyPresenter postData={postArray} />;
}
