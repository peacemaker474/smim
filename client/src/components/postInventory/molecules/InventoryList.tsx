import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import styled from 'styled-components';
import useObserve from '../../../hooks/useObserve';
import { getPostListRead } from '../../../networks/post/http';
import { useAppSelector } from '../../../redux/hooks';
import InventoryItem from '../atoms/InventoryItem';
import { PostDetailData } from '../../../type/postTypes';

interface LoadedPostProps {
  queryKey: any[]; // multi type Array
  pageParam: number;
}

type Params = {
  age: string;
};

function InventoryList() {
  const obsRef = useRef(null);
  const { age } = useParams<keyof Params>() as Params;
  const searchData = useAppSelector((state) => state.searchKeyword);
  const { filter: postFilter } = useAppSelector((state) => state.searchFilter);

  const loadedPostListData = async ({ queryKey, pageParam = 1 }: LoadedPostProps) => {
    const { age, postFilter, searchData } = queryKey[1];

    const response = await getPostListRead(age, postFilter, searchData, pageParam);
    return response.data;
  };

  const {
    data: postData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ['postArray', { age, postFilter, searchData }],
    ({ queryKey, pageParam }) => loadedPostListData({ queryKey, pageParam }),
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.page + 1;
        return currentPage.lastPage ? null : nextPage;
      },
    },
  );
  useObserve(obsRef, hasNextPage, fetchNextPage);

  return (
    <PostListBodyContainer>
      <PostListBodyLayout>
        {postData && (
          <>
            {postData.pages[0].data.length === 0 && <PostEmptyItem>게시물이 없습니다😢</PostEmptyItem>}
            {postData.pages.map((item) => {
              return item.data.map((el: PostDetailData) => !el.block && <InventoryItem key={el._id} postData={el} />);
            })}
          </>
        )}
        <div ref={obsRef} />
      </PostListBodyLayout>
    </PostListBodyContainer>
  );
}

export default InventoryList;

const PostListBodyContainer = styled.div`
  margin-top: 67px;
`;

const PostListBodyLayout = styled.div`
  display: grid;
  grid-template-columns: 234px 234px 234px;
  gap: 20px 14px;
  position: relative;
  @media screen and (max-width: 588px) {
    grid-template-columns: 252px;
    margin-top: 35px;
  }
  @media (min-width: 588px) and (max-width: 850px) {
    grid-template-columns: 234px 234px;
  }
`;

const PostEmptyItem = styled.div`
  position: relative;
  height: 255px;
  border: 2px solid ${({ theme }) => theme.color.lightGray};
  border-radius: 20px;
  padding: 31px 21px;
  font-size: 13px;
  text-align: center;
  line-height: 186px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.darkGray};
`;
