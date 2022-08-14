import React from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { getPostListRead } from '../../../network/post/http';
import LoadingPage from '../../../pages/LoadingPage';
import PostListBodyPresenter from './PostListBody.style';

export default function PostListBody({ setPostArray, postArray, age }) {
  const { accessToken } = useSelector((state) => state.authToken);

  const loadedPostListData = async ({ queryKey }) => {
    const [{ age }] = queryKey;
    try {
      const response = await getPostListRead(age, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setPostArray(
        response.data.sort((a, b) => (a.createAt > b.createAt ? -1 : a.create < b.create ? 1 : 0))
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, isLoading, isFetching } = useQuery([('postArray', { age })], loadedPostListData);

  if (isLoading || isFetching) {
    return <LoadingPage position='absolute' />;
  }

  return <PostListBodyPresenter postData={postArray || data} data={data} />;
}
