import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getPostListRead } from '../../../network/post/http';
import PostListBodyPresenter from './PostListBody.style';
import LoadingPage from '../../../pages/LoadingPage';

export default function PostListBody({ age, postFilter, searchList }) {
  const obsRef = useRef(null);

  const loadedPostListData = async ({ queryKey, pageParam = 1 }) => {
    const [{ age, postFilter, searchList }] = queryKey;

    try {
      const response = await getPostListRead(age, pageParam, postFilter, searchList);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery(
    [('postArray', { age, postFilter, searchList })],
    loadedPostListData,
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.page + 1;
        return currentPage.lastPage ? null : nextPage;
      },
    }
  );

  useEffect(() => {
    if (!hasNextPage) {
      return;
    }
    const observer = new IntersectionObserver((entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      })
    );
    const el = obsRef && obsRef.current;
    if (!el) {
      return;
    }
    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) return <LoadingPage />;

  return (
    <PostListBodyPresenter 
      postData={data}
      obsRef={obsRef} 
    />
  );
}
