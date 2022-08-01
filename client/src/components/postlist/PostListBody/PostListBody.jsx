import React from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { getPostListRead } from '../../../network/post/http';
import LoadingPage from '../../../pages/LoadingPage';
import PostListBodyPresenter from './PostListBody.style';

export default function PostListBody({ setPostArray, postArray, age }) {
  const tkn = useSelector((state) => state.authToken).accessToken;

  const settingData = async ({ queryKey }) => {
    const [{ age }] = queryKey;
    try {
      const response = await getPostListRead(age, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tkn}`,
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

  const { data, isLoading } = useQuery([('postArray', { age })], settingData);

  if (isLoading) {
    return <LoadingPage position='absolute' />;
  }

  return <PostListBodyPresenter postData={postArray || data} data={data} />;
}
